<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, type PropType, ref } from 'vue'
import { ITableSort, ITableSortState, SortDirection } from '@/types/ITable'
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

const initial_direction = ref<SortDirection>(null)

const isActive = computed((): boolean => {
  return props.column === props.sort.sort_column && props.sort.sort_direction !== null
})

const sortState = computed((): ITableSortState => {
  switch (true) {
    case props.sort.sort_direction === 'asc' && isActive.value:
      return {
        direction: 'asc',
        next_direction: initial_direction.value === 'asc' ? 'desc' : null,
        icon: 'arrow_upward'
      }
    case props.sort.sort_direction === 'desc' && isActive.value:
      return {
        direction: 'desc',
        next_direction: initial_direction.value === 'asc' ? null : 'asc',
        icon: 'arrow_downward'
      }
    default:
      return {
        direction: null,
        next_direction: initial_direction.value === 'asc' ? 'asc' : 'desc',
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

onMounted(() => {
  initial_direction.value = props.sort?.sort_direction
})
</script>

<template>
  <div class="mc-table-sort" @click="handleSortChange">
    <mc-svg-icon size="200" :name="sortState.icon" :color="isActive ? 'black' : 'gray'" />
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
