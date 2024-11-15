<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { ITableColumnEnriched } from '@/types'

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

<style lang="scss">
@import '../../../../assets/styles/mixins';
@import '../../../../assets/tokens/z-indexes';
@import '../../../../assets/tokens/colors';
@import '../../../../assets/tokens/spacings';
@import '../../../../assets/tokens/sizes';
@mixin gradient() {
  background: $color-hover-gray;
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from($color-hover-gray),
    color-stop(0.2, rgba($color-white, 0.5)),
    color-stop(0.4, $color-hover-gray),
    to($color-hover-gray)
  );
  background-image: -webkit-linear-gradient(
    left,
    $color-hover-gray 0%,
    rgba($color-white, 0.5) 20%,
    $color-hover-gray 40%,
    $color-hover-gray 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: placeHolderShimmer 1s linear infinite forwards;
  border-radius: 10px;
  > * {
    background: transparent;
    position: relative;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      border: 500px solid $color-white;
      width: 100%;
    }
  }
}

.mc-table-skeleton-loading {
  display: flex;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: $z-index-overlay;
  background-color: $color-white;
  user-select: none;
  //margin-top: calc(var(--mc-table-header-row-height) * -1);
  &__col {
    width: var(--mc-table-cell-width);
    max-width: var(--mc-table-cell-max-width);
    min-width: var(--mc-table-cell-min-width);
  }
  &__cell {
    height: var(--mc-table-row-height);
  }
  &__loader {
    width: 100%;
    display: flex;
    align-items: center;
    height: $space-500;
    padding: $space-100 $space-200;
    &_avatar {
      display: block;
      float: left;
      position: relative;
      height: $size-300;
      width: $size-300;
      min-width: $size-300;
      margin-inline-end: $space-50;
      @include gradient();
    }
    &_preview-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      @include child-indent-bottom($space-50);
    }
    &_line {
      display: block;
      position: relative;
      height: $size-100;
      width: 100%;
      @include gradient();
    }
    &--more-height {
      .line {
        height: $size-150;
        width: 75%;
        min-width: 150px;
      }
    }

    @keyframes placeHolderShimmer {
      0% {
        background-position: -468px 0;
      }
      100% {
        background-position: 468px 0;
      }
    }
  }
}
</style>
