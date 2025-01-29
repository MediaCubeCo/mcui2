import { type ITooltip, type ITooltipInstance, type ITooltipStyles } from '@/types/ITooltip'
import { useDebounceFn } from '@vueuse/core'
import { useRandomNumber } from '@/composables/useRandomNumber'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { TooltipPositions, TooltipSizes } from '@/enums'
import { Colors, type ColorsUnion } from '@/types'
import { useHelper } from '@/composables/useHelper'

const debounce = useDebounceFn((method) => {
  method()
}, 150)

const tooltipInstances = ref<ITooltipInstance[]>([])
const helper = useHelper()

class TooltipInstance {
  id: number
  target: HTMLElement
  content: string | undefined
  visible = ref(false)
  position = ref<ITooltipStyles>({ top: null, left: null, translate: 'translate(0, 0)' })
  placement: TooltipPositions
  size: TooltipSizes
  arrow: boolean
  color: ColorsUnion
  textColor: ColorsUnion

  constructor(el: HTMLElement, value: ITooltip) {
    this.target = el
    this.content = value.content
    this.placement = value.placement || TooltipPositions.Top
    this.size = value.size || TooltipSizes.M
    this.id = useRandomNumber().timestamp(5)
    this.arrow = helper.hasProperty(value, 'arrow') ? !!value.arrow : true
    this.color = value.color || Colors.black
    this.textColor = value.textColor || Colors.white

    this.target.addEventListener('mouseenter', this.showTooltip)
    this.target.addEventListener('mouseleave', this.hideTooltip)

    //@ts-ignore
    tooltipInstances.value.push(this)
  }

  showTooltip = (): void => {
    this.updateTooltipPosition()
    this.visible.value = true

    let tooltipElement = document.getElementById(String(this.id))

    if (!tooltipElement) {
      const tooltipDiv = document.createElement('div')
      tooltipDiv.classList.add('mc-tooltip')
      tooltipDiv.id = String(this.id)
      tooltipDiv.innerText = this.content || ''
      tooltipDiv.style.setProperty('--tooltip-color', this.color)
      tooltipDiv.style.setProperty('--tooltip-text-color', this.textColor)
      tooltipDiv.setAttribute('tooltip-placement', this.placement)
      tooltipDiv.setAttribute('tooltip-size', this.size)
      tooltipDiv.setAttribute('tooltip-arrow', String(this.arrow))
      document.getElementById('tooltip-container')?.appendChild(tooltipDiv)
    }

    tooltipElement = document.getElementById(String(this.id))
    if (tooltipElement) {
      tooltipElement.style.visibility = 'visible'
      for (const key in this.position.value) {
        if (key && helper.hasProperty(this.position.value, key)) {
          //@ts-ignore
          tooltipElement.style[key] = `${this.position.value[key]}px`
        }
      }
      tooltipElement.style.transform = this.position.value.translate
    }
  }

  hideTooltip = (): void => {
    this.visible.value = false
    const tooltipElement = document.getElementById(String(this.id))
    if (tooltipElement) {
      tooltipElement.style.visibility = 'hidden'
    }
  }

  updateTooltipPosition = (): void => {
    const { top, left, width, height } = this.target.getBoundingClientRect()
    const requiredTop = top + window.scrollY
    const requiredLeft = left + window.scrollX
    const space = 4
    const arrow = this.arrow ? 4 : 0

    switch (this.placement) {
      case TooltipPositions.Right:
        this.position.value = {
          top: requiredTop,
          left: requiredLeft + width + (space + arrow),
          translate: `translate(0, calc(-50% + ${height / 2}px))`
        }
        break
      case TooltipPositions.Left:
        this.position.value = {
          top: requiredTop,
          left: requiredLeft - (space + arrow),
          translate: `translate(-100%, calc(-50% + ${height / 2}px))`
        }
        break
      case TooltipPositions.Top:
        this.position.value = {
          top: requiredTop - (space + arrow),
          left: requiredLeft + width / 2,
          translate: 'translate(-50%, -100%)'
        }
        break
      case TooltipPositions.Bottom:
        this.position.value = {
          top: requiredTop + height + (space + arrow),
          left: requiredLeft + width / 2,
          translate: 'translate(-50%, 0%)'
        }
        break
    }
  }

  destroy = (): void => {
    this.target.removeEventListener('mouseenter', this.showTooltip)
    this.target.removeEventListener('mouseleave', this.hideTooltip)
    tooltipInstances.value = tooltipInstances.value.filter((instance) => instance.id !== this.id)
    const tooltipToDestroy = document.getElementById(String(this.id))
    tooltipToDestroy && tooltipToDestroy.remove()
  }
}

onMounted(() => {
  window.addEventListener('scroll', () => updateAllTooltips)
  window.addEventListener('resize', () => updateAllTooltips)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => updateAllTooltips)
  window.removeEventListener('resize', () => updateAllTooltips)
})

const updateAllTooltips = debounce(() => {
  tooltipInstances.value.forEach((instance) => instance.updateTooltipPosition())
})

const createTooltipContainer = () => {
  const modalContainerElement = document.createElement('div')
  modalContainerElement.id = 'tooltip-container'
  document.body.appendChild(modalContainerElement)
}

const ensureTooltipContainerExists = () => {
  if (!document.getElementById('tooltip-container')) {
    createTooltipContainer()
  }
}

export function useTooltip() {
  const tooltip = ref<ITooltipInstance | null>(null)
  return {
    mounted(el: HTMLElement, binding: { value: ITooltip }) {
      ensureTooltipContainerExists()

      const content = binding.value.content
      if (!content) return
      //@ts-ignore
      tooltip.value = new TooltipInstance(el, binding.value)
    },
    updated() {},
    beforeUnmount() {
      tooltip.value?.destroy()
    }
  }
}
