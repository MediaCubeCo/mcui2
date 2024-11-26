<script lang="ts" setup>
import { ref, onMounted, nextTick, watch, type PropType, computed } from 'vue'

interface VisibleItem {
  key: number
  data: any
  index: number
  top: number
}

const props = defineProps({
  /**
   * Массив данных для рендеринга
   * */
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true
  },
  /**
   * Высота контейнера скролла
   * */
  containerHeight: {
    type: Number as PropType<number>,
    required: true
  },
  /**
   * Высота 1 элемента списка
   * */
  itemHeight: {
    type: Number as PropType<number>,
    default: 20,
    required: true
  },
  /**
   * Буфер для подгрузки дополнительных элементов вне видимой области
   * */
  buffer: {
    type: Number as PropType<number>,
    default: 1
  }
})

const containerRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref<number>(0)
const visibleItems = ref<VisibleItem[]>([])
const totalHeight = ref<number>(0)

const styles = computed((): { [key: string]: string } => {
  return {
    height: `${props.containerHeight}px`,
    overflowY: 'auto',
    position: 'relative'
  }
})

onMounted((): void => {
  calculateTotalHeight()
  nextTick(calculateVisibleItems)
})

const calculateTotalHeight = (): void => {
  totalHeight.value = props.items.length * props.itemHeight
}

const calculateVisibleItems = (): void => {
  const containerHeight = containerRef.value?.clientHeight || 0
  const startIndex = Math.floor(scrollTop.value / props.itemHeight)
  const endIndex = Math.min(props.items.length - 1, Math.floor((scrollTop.value + containerHeight) / props.itemHeight))
  const buffer = props.buffer || 5

  const result: VisibleItem[] = []
  for (let i = Math.max(0, startIndex - buffer); i <= Math.min(endIndex + buffer, props.items.length - 1); i++) {
    result.push({
      key: i,
      data: props.items[i],
      index: i,
      top: i * props.itemHeight
    } as VisibleItem)
  }
  visibleItems.value = result
}

const onScroll = (): void => {
  scrollTop.value = containerRef.value?.scrollTop || 0
  requestAnimationFrame(calculateVisibleItems)
}

watch(
  () => props.items,
  (): void => {
    calculateTotalHeight()
    nextTick(calculateVisibleItems)
  }
)
</script>

<template>
  <div class="mc-virtual-scroll" ref="containerRef" @scroll="onScroll" :style="styles">
    <div
      v-for="item in visibleItems"
      :key="`mc-virtual-scroll__item-${item.key}`"
      class="mc-virtual-scroll__item"
      :style="{ top: `${item.top}px` }"
    >
      <slot name="item" :item="item.data" :index="item.index"></slot>
    </div>

    <!-- Пустое пространство для скролла -->
    <div :style="{ height: `${totalHeight}px` }"></div>
  </div>
</template>

<style lang="scss">
.mc-virtual-scroll {
  position: relative;
  overflow-y: auto;
  &__item {
    position: absolute;
    transition: all 0.3s ease;
    width: 100%;
  }
}
</style>
