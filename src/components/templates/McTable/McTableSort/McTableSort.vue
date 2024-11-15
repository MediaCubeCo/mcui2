<script setup lang="ts">
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { computed, type PropType } from 'vue'
import type { ITableSort, ITableSortState } from '@/types/ITable'

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
  return props.column === props.sort.sort_column
})

const sortState = computed((): ITableSortState => {
  switch (true) {
    case props.sort.sort_direction === 'asc' && isActive.value:
      return {
        direction: 'asc',
        next_direction: 'desc',
        icon: 'arrow_downward',
      }
    case props.sort.sort_direction === 'desc' && isActive.value:
      return {
        direction: 'desc',
        next_direction: 'asc',
        icon: 'arrow_upward',
      }
    default:
      return {
        direction: null,
        next_direction: 'asc',
        icon: 'arrow_up_down',
      }
  }
})

const handleSortChange = () => {
  emit('change', {
    sort_column: props.column,
    sort_direction: sortState.value.next_direction
  })
}
</script>

<template>
  <div class="mc-table-sort" @click="handleSortChange">
    <mc-svg-icon size="200" :name="sortState.icon" :color="isActive ? 'black' : 'gray'" />
  </div>
</template>

<style lang="scss">
.mc-table-sort {
  cursor: pointer;
}
</style>
