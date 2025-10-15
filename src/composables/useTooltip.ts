import { type ITooltip, type ITooltipInstance, type ITooltipStyles } from '@/types/ITooltip'
import { useDebounceFn } from '@vueuse/core'
import { useRandomNumber } from '@/composables/useRandomNumber'
import { ref } from 'vue'
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
  position = ref<ITooltipStyles>({ top: 0, left: 0, translate: 'translate(0, 0)' })
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

    this.target.onmouseenter = this.showTooltip
    this.target.onmouseleave = this.hideTooltip

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
      tooltipDiv.style.setProperty('--tooltip-arrow-left', '50%')
      tooltipDiv.setAttribute('tooltip-placement', this.placement)
      tooltipDiv.setAttribute('tooltip-size', this.size)
      tooltipDiv.setAttribute('tooltip-arrow', String(this.arrow))
      document.getElementById('tooltip-container')?.appendChild(tooltipDiv)

      // tooltipDiv.onmouseenter = this.showTooltip
      // tooltipDiv.onmouseleave = this.hideTooltip
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
      setTimeout(() => {
        // Если на момент выхода таймера, его не открыли заново, удаляем
        !this.visible.value && this.destroy()
      }, 1000)
    }
  }

  updateTooltipPosition = (): void => {
    const { top, left, width, height } = this.target.getBoundingClientRect()
    const requiredTop = top + window.scrollY
    const requiredLeft = left + window.scrollX
    const space = 4
    const arrow = this.arrow ? 4 : 0

    let pos = <ITooltipStyles>{ top: 0, left: 0, translate: '' }

    //@ts-ignore
    const computePosition = (placement: string): ITooltipStyles => {
      switch (placement) {
        case TooltipPositions.Right:
          return  {
            top: requiredTop,
            left: requiredLeft + width + (space + arrow),
            translate: `translate(0, calc(-50% + ${height / 2}px))`
          }
        case TooltipPositions.Left:
          return {
            top: requiredTop,
            left: requiredLeft - (space + arrow),
            translate: `translate(-100%, calc(-50% + ${height / 2}px))`
          }
        case TooltipPositions.Top:
          return {
            top: requiredTop - (space + arrow),
            left: requiredLeft + width / 2,
            translate: 'translate(-50%, -100%)'
          }
        case TooltipPositions.Bottom:
          return  {
            top: requiredTop + height + (space + arrow),
            left: requiredLeft + width / 2,
            translate: 'translate(-50%, 0%)'
          }
        default:
          return { top: 0, left: 0, translate: '' }
      }
    }

    pos = computePosition(this.placement)

    this.position.value = pos

    setTimeout(() => {
      const tooltipEl = document.getElementById(String(this.id))
      if (!tooltipEl) return

      const { width: ttWidth, height: ttHeight } = tooltipEl.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const overflowRight = pos.left + ttWidth / 2 > viewportWidth
      const overflowLeft = pos.left - ttWidth / 2 < 0
      const overflowTop = pos.top - ttHeight < 0
      const overflowBottom = pos.top + ttHeight > viewportHeight

      if (this.placement === TooltipPositions.Right && overflowRight) {
        this.placement = TooltipPositions.Left
      } else if (this.placement === TooltipPositions.Left && overflowLeft) {
        this.placement = TooltipPositions.Right
      } else if (this.placement === TooltipPositions.Top && overflowTop) {
        this.placement = TooltipPositions.Bottom
      } else if (this.placement === TooltipPositions.Bottom && overflowBottom) {
        this.placement = TooltipPositions.Top
      }
      pos = computePosition(this.placement)

      let correctedLeft = pos.left
      let correctedTop = pos.top

      if (this.placement === TooltipPositions.Top || this.placement === TooltipPositions.Bottom) {
        const halfWidth = ttWidth / 2

        if (correctedLeft - halfWidth < 4) {
          correctedLeft = halfWidth + 4
        } else if (correctedLeft + halfWidth > viewportWidth - 4) {
          correctedLeft = viewportWidth - halfWidth - 4
        }
      }

      if (this.placement === TooltipPositions.Left || this.placement === TooltipPositions.Right) {
        const halfHeight = ttHeight / 2

        if (correctedTop - halfHeight < 4) {
          correctedTop = halfHeight + 4
        } else if (correctedTop + halfHeight > viewportHeight - 4) {
          correctedTop = viewportHeight - halfHeight - 4
        }
      }

      const arrowOffset = requiredLeft + width / 2 - correctedLeft

      this.position.value = {
        ...pos,
        top: Math.min(correctedTop, pos.top),
        left: correctedLeft,
      }
      for (const key in this.position.value) {
        if (key && helper.hasProperty(this.position.value, key)) {
          //@ts-ignore
          tooltipEl.style[key] = `${this.position.value[key]}px`
        }
      }
      tooltipEl.style.transform = this.position.value.translate
      tooltipEl.style.setProperty('--tooltip-arrow-left', `calc(50% + ${arrowOffset}px)`)
      tooltipEl.setAttribute('tooltip-placement', this.placement)
    }, 1)
  }

  destroy = (): void => {
    this.target.removeEventListener('mouseenter', this.showTooltip)
    this.target.removeEventListener('mouseleave', this.hideTooltip)
    tooltipInstances.value = tooltipInstances.value.filter((instance) => instance.id !== this.id)
    const tooltipToDestroy = document.getElementById(String(this.id))
    tooltipToDestroy && tooltipToDestroy.remove()
  }
}

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

      window.addEventListener('scroll', () => updateAllTooltips)
      window.addEventListener('resize', () => updateAllTooltips)
    },
    updated(el: HTMLElement, binding: { value: ITooltip }) {
      if (!tooltip.value || !tooltip.value.id) return

      debounce(() => {
        const check_fields = ['arrow', 'color', 'content', 'placement', 'size', 'textColor']
        const tooltip_data = helper.pickDeep({ ...tooltip.value }, check_fields)
        const binding_data = helper.pickDeep(binding.value, check_fields)

        if (!helper.isEqual(tooltip_data, binding_data)) {
          tooltip.value?.destroy()
          //@ts-ignore
          tooltip.value = new TooltipInstance(el, binding.value)
        }
      })
    },
    beforeUnmount() {
      tooltip.value?.destroy()

      window.removeEventListener('scroll', () => updateAllTooltips)
      window.removeEventListener('resize', () => updateAllTooltips)
    }
  }
}
