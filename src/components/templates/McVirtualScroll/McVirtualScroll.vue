<script lang="ts" setup>
import {
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
  type PropType,
  computed
} from 'vue'

interface VisibleItem {
  key: number
  data: any
  index: number
  top: number
}

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true
  },
  containerHeight: {
    type: Number as PropType<number>,
    required: true
  },
  itemHeight: {
    type: Number as PropType<number>,
    default: 20,
    required: true
  },
  buffer: {
    type: Number as PropType<number>,
    default: 1
  }
})

const containerRef = ref<HTMLDivElement | null>(null)
const visibleItems = ref<VisibleItem[]>([])
const totalHeight = ref(0)

let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null

/** Высота задаётся пропом; overflow-y задан в scss у .mc-virtual-scroll */
const styles = computed((): Record<string, string> => ({
  height: `${props.containerHeight}px`,
  position: 'relative'
}))

const calculateTotalHeight = (): void => {
  totalHeight.value = props.items.length * props.itemHeight
}

const calculateVisibleItems = (): void => {
  rafId = null

  const el = containerRef.value
  if (!el) return

  const scrollTop = el.scrollTop
  const clientH = el.clientHeight || 0
  const ih = props.itemHeight
  const len = props.items.length

  if (len === 0 || ih <= 0) {
    visibleItems.value = []
    return
  }

  const startIndex = Math.floor(scrollTop / ih)
  const endIndex = Math.min(len - 1, Math.floor((scrollTop + clientH) / ih))
  const buffer = Math.max(0, props.buffer)

  const from = Math.max(0, startIndex - buffer)
  const to = Math.min(endIndex + buffer, len - 1)

  const next: VisibleItem[] = []
  for (let i = from; i <= to; i++) {
    next.push({
      key: i,
      data: props.items[i],
      index: i,
      top: i * ih
    })
  }
  visibleItems.value = next
}

const scheduleVisibleItems = (): void => {
  if (typeof requestAnimationFrame === 'undefined') {
    calculateVisibleItems()
    return
  }
  if (rafId != null) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(calculateVisibleItems)
}

const onScroll = (): void => {
  scheduleVisibleItems()
}

onMounted(() => {
  calculateTotalHeight()
  nextTick(() => {
    calculateVisibleItems()
  })

  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      scheduleVisibleItems()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  resizeObserver?.disconnect()
  resizeObserver = null
})

/** Ссылка на массив + длина: push/splice/new array; без deep — дешевле */
watch(
  [() => props.items, () => props.items.length, () => props.itemHeight],
  () => {
    calculateTotalHeight()
    nextTick(scheduleVisibleItems)
  },
  { flush: 'post' }
)

watch(
  () => props.containerHeight,
  () => {
    nextTick(scheduleVisibleItems)
  },
  { flush: 'post' }
)
</script>

<template>
  <div class="mc-virtual-scroll" ref="containerRef" :style="styles" @scroll.passive="onScroll">
    <div
      v-for="item in visibleItems"
      :key="`mc-virtual-scroll__item-${item.key}`"
      class="mc-virtual-scroll__item"
      :style="{ top: `${item.top}px` }"
    >
      <slot name="item" :item="item.data" :index="item.index" />
    </div>

    <div :style="{ height: `${totalHeight}px` }" />
  </div>
</template>

<style lang="scss" src="./index.scss"></style>