<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

type Neighbor = HTMLElement
interface INeighbors {
  [key: string]: Neighbor[]
}

const debounce = useDebounceFn((method) => {
  method();
}, 50);

const props = defineProps({
  /**
   * Набор полей за которыми нужно следить
   * */
  watchFields: {
    type: Array as () => string[],
    default: () => ['.mc-field-text', '.mc-field-select', '.mc-date-picker'],
  },
})

const wrapper = ref<HTMLElement | null>(null)

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-field-group': true,
  }
})


const setElemMinHeight = (elem: HTMLElement, height: number) => {
  if (elem) {
    const header: HTMLElement | null = elem.querySelector("[class*='__header']")
    if (!header) return
    // ставим каждому хедеру фикс высоту, а все элементы прижимаем к полю ввода
    header.style.alignItems = 'self-end'
    header.style.display = 'inline-flex'
    header.style.minHeight = `${+height + 2}px`
  }
}

// Принимает ссылку на элемент инпута и массив соседей и вычисляем максимальную высоту заголовка
const calcEqualHeaderHeight = (neighbors: INeighbors) => {
  Object.keys(neighbors).forEach(neighborsKey => {
    const neighborsTopsHeight: number[] = []

    neighbors[neighborsKey].forEach(neighbor => {
      const header: HTMLElement | null = neighbor.querySelector("[class*='__header']")
      if (header) {
        header.style.minHeight = `auto`
        neighborsTopsHeight.push(header.clientHeight)
      }
    })
    const highestHeight = Math.max(...neighborsTopsHeight)

    neighbors[neighborsKey].forEach((neighbor: Neighbor) => {
      setElemMinHeight(neighbor, highestHeight)
    })

  })
}

const calcNeighbors = () => {
  const neighbors: INeighbors = {}

  // Проходимся по всем классам, которые нужно отслеживать
  props.watchFields.forEach((elemClass: string) => {
    // берем все элементы которые есть в нашем враппере
    const selectedElements: NodeListOf<Element> = wrapper.value!.querySelectorAll(elemClass)
    // проходимся по ним и складываем в массивы, рядами
    selectedElements.forEach((selectedElem) => {
      const { top } = selectedElem.getBoundingClientRect()
      neighbors[top] ? neighbors[top].push(selectedElem as HTMLElement) : neighbors[top] = [selectedElem as HTMLElement]
    })
  })

  // запускаем рассчет высоты хедера у групп элементов
  calcEqualHeaderHeight(neighbors)
}

const handleCalcNeighbors = () => debounce(calcNeighbors)

onMounted(async () => {
  // Ожидаем отрисовки слотов
  await nextTick(() => {})
  // Начинаем рассчет соседей
  calcNeighbors()
  window.addEventListener('resize', handleCalcNeighbors)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleCalcNeighbors)
})
</script>

<template>
  <div ref="wrapper" :class="classes">
    <slot />
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/font-families' as *;
.mc-field-group {
  $block-name: &;
  font-family: $font-family-main;
}
</style>
