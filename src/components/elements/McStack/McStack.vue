<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  useSlots,
  render as vueRender,
  cloneVNode,
  getCurrentInstance,
  watch,
  type PropType,
  type Slots,
  type VNode
} from 'vue'
import { Spaces, SpacesUnion } from '@/types/styles/Spaces'
import { TooltipSizes } from '@/enums/Tooltip'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'

const emit = defineEmits<{
  (e: 'updated:hidden-count', value: number): any[]
}>()

const props = defineProps({
  visibleCount: {
    type: Number as PropType<number>,
    default: Infinity
  },
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  overflowTooltip: {
    type: String as PropType<string>,
    default: null
  }
})

const slots = useSlots() as Slots
const container = ref<HTMLElement | null>(null)

const instance = getCurrentInstance()
const parentAppContext = instance?.appContext

const children = computed((): VNode[] => {
  const renderDefault = slots.default
  if (!renderDefault) return []
  const vnodes = renderDefault()
  if (!vnodes?.length) return []
  const first = vnodes[0] as VNode & { children?: VNode[] }
  if (Array.isArray(first?.children) && first.children.length) {
    return first.children as VNode[]
  }
  return vnodes as VNode[]
})

const visibleChildren = ref<VNode[]>([])
const hiddenCount = ref(0)
const prevHiddenCount = ref(-1)

let resizeObserver: ResizeObserver | null = null
let resizeRafId: number | null = null

let widthCache = new WeakMap<VNode, number>()
let tempContainer: HTMLDivElement | null = null

const classes = computed((): Record<string, boolean> => ({
  'mc-stack': true,
  'mc-stack--collapsed': props.collapsed
}))

function ensureTempContainer(): HTMLDivElement {
  if (!tempContainer) {
    tempContainer = document.createElement('div')
    tempContainer.style.cssText =
      'position:absolute;left:-99999px;top:0;visibility:hidden;white-space:nowrap;pointer-events:none'
    document.body.appendChild(tempContainer)
  }
  return tempContainer
}

function measureItemWidth(item: VNode, rootFontPx: number): number {
  const getSize = (size: SpacesUnion) => parseFloat(size) * rootFontPx

  const wrap = ensureTempContainer()
  const itemNode = document.createElement('div')
  wrap.appendChild(itemNode)

  const vnode = cloneVNode(item)
  if (parentAppContext) {
    vnode.appContext = parentAppContext
  }

  vueRender(vnode, itemNode)

  const extra = props.collapsed ? 6 : 4
  const w = itemNode.getBoundingClientRect().width + extra

  vueRender(null, itemNode)
  wrap.removeChild(itemNode)

  return w
}

function emitHiddenIfChanged(): void {
  if (+prevHiddenCount.value !== +hiddenCount.value) {
    prevHiddenCount.value = hiddenCount.value
    emit('updated:hidden-count', hiddenCount.value)
  }
}

const updateChildrenVisible = (): void => {
  if (typeof document === 'undefined') return
  if (!container.value) return

  const list = children.value
  const rootFontPx = parseInt(getComputedStyle(document.documentElement).fontSize, 10) || 16
  const getSize = (size: SpacesUnion) => parseFloat(size) * rootFontPx
  const moreContentWidth = getSize(Spaces['300'])
  const itemIndent = props.collapsed ? -getSize(Spaces['200']) : getSize(Spaces['150'])
  const available = container.value.clientWidth - moreContentWidth

  let totalWidth = 0
  const nextVisible: VNode[] = []
  let itemCount = 0

  for (const item of list) {
    let itemWidth = widthCache.get(item)
    if (itemWidth == null) {
      itemWidth = measureItemWidth(item, rootFontPx)
      widthCache.set(item, itemWidth)
    }

    const fits =
      (totalWidth + (itemWidth + itemIndent) <= available && itemCount < props.visibleCount) ||
      itemCount === 0

    if (fits) {
      totalWidth += itemWidth + itemIndent
      nextVisible.push(item)
      itemCount++
    } else {
      hiddenCount.value = list.length - nextVisible.length
      visibleChildren.value = nextVisible
      emitHiddenIfChanged()
      return
    }
  }

  hiddenCount.value = 0
  visibleChildren.value = nextVisible
  emitHiddenIfChanged()
}

const scheduleUpdateChildrenVisible = (): void => {
  if (typeof requestAnimationFrame === 'undefined') {
    updateChildrenVisible()
    return
  }
  if (resizeRafId != null) cancelAnimationFrame(resizeRafId)
  resizeRafId = requestAnimationFrame(() => {
    resizeRafId = null
    updateChildrenVisible()
  })
}

watch(
  () => children.value,
  () => {
    widthCache = new WeakMap()
    scheduleUpdateChildrenVisible()
  },
  { flush: 'post' }
)

onMounted(() => {
  resizeObserver = new ResizeObserver(scheduleUpdateChildrenVisible)
  if (container.value) resizeObserver.observe(container.value)
  scheduleUpdateChildrenVisible()
})

onUnmounted(() => {
  if (resizeRafId != null) {
    cancelAnimationFrame(resizeRafId)
    resizeRafId = null
  }
  resizeObserver?.disconnect()
  if (tempContainer?.parentNode) {
    tempContainer.parentNode.removeChild(tempContainer)
  }
  tempContainer = null
})
</script>

<template>
  <div ref="container" :class="classes">
    <div ref="content" class="mc-stack__content">
      <template v-for="(child, i) in visibleChildren" :key="`mc-stack-item-${i}`">
        <component :is="child" />
      </template>
      <span v-if="hiddenCount > 0" class="mc-stack__more-label">
        <mc-tooltip v-if="overflowTooltip" :key="overflowTooltip" :size="TooltipSizes.Xs" :content="overflowTooltip">
          +{{ hiddenCount }}
        </mc-tooltip>
        <template v-else>+{{ hiddenCount }}</template>
      </span>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
