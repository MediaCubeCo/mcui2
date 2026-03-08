<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { ITableColumnEnriched } from '@/types/ITable'

const props = defineProps({
  columns: {
    type: Array as PropType<ITableColumnEnriched[]>,
    required: true,
    default: () => [] as ITableColumnEnriched[]
  }
})

const firstColsWidth = computed(() => {
  const [firstColumn] = props.columns
  return firstColumn.width
})
</script>

<template>
  <section class="mc-table-skeleton-loading skeleton-load-wrapper">
    <div
      v-for="(column, i) in props.columns"
      :style="column.style"
      class="mc-table-skeleton-loading__col"
      :key="`skeleton-col__${i}`"
    >
      <div v-for="(cell, cellI) in 36" :key="`skeleton-cell-${cellI}`" class="mc-table-skeleton-loading__cell">
        <div v-if="!cellI" class="mc-table-skeleton-loading__loader mc-table-skeleton-loading__loader--more-height">
          <div class="mc-table-skeleton-loading__loader_line"></div>
        </div>
        <div v-if="!i" class="mc-table-skeleton-loading__loader" :style="{ minWidth: `${firstColsWidth}px` }">
          <div class="mc-table-skeleton-loading__loader_avatar"></div>
          <div class="mc-table-skeleton-loading__loader_preview-content">
            <div class="mc-table-skeleton-loading__loader_line"></div>
            <div class="mc-table-skeleton-loading__loader_line"></div>
          </div>
        </div>
        <div v-else class="mc-table-skeleton-loading__loader">
          <div class="mc-table-skeleton-loading__loader_line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
