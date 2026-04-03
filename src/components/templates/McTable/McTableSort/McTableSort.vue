<script setup lang="ts">
import { computed, defineAsyncComponent, type PropType } from 'vue'
import type { ITableSort, ITableSortState } from '@/types/ITable'
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))

const emit = defineEmits<{
  (e: 'change', value: ITableSort): void
}>()

const props = defineProps({
  sort: {
    type: Object as PropType<ITableSort>,
    default: () => ({})
  },
  column: {
    type: String as PropType<string>,
    default: null
  }
})

const isActive = computed((): boolean => {
  return props.column === props.sort.sort_column && props.sort.sort_direction !== null
})

const sortState = computed((): ITableSortState => {
  switch (true) {
    case props.sort.sort_direction === 'asc' && isActive.value:
      return {
        direction: 'asc',
        next_direction: 'desc',
        icon: 'arrow_upward'
      }
    case props.sort.sort_direction === 'desc' && isActive.value:
      return {
        direction: 'desc',
        next_direction: null,
        icon: 'arrow_downward'
      }
    default:
      return {
        direction: null,
        next_direction: 'asc',
        icon: 'arrow_up_down'
      }
  }
})

const handleSortChange = () => {
  const payload = sortState.value.next_direction
    ? {
        sort_column: props.column,
        sort_direction: sortState.value.next_direction
      }
    : {
        sort_column: null,
        sort_direction: null
      }
  emit('change', payload)
}
</script>

<template>
  <div class="mc-table-sort" @click="handleSortChange">
    <mc-svg-icon size="200" :name="sortState.icon" :color="isActive ? 'black' : 'gray'" />
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
