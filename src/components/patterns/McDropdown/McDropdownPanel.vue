<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
  maxHeight: {
    type: Number as PropType<number>,
    default: 300
  }
})

const panelStyles = computed((): { [key: string]: string } => {
  return {
    '--panel-max-height': `${props.maxHeight}px`
  }
})
</script>

<template>
  <section class="mc-dropdown-panel" :style="panelStyles">
    <!-- @slot Слот контента -->
    <slot />
  </section>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/box-shadows' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/border-radius' as *;
.mc-dropdown-panel {
  $block-name: &;
  --panel-max-height: 300px;

  font-family: $font-family-main;
  box-shadow: $shadow-s;
  border-radius: $radius-150;
  background-color: $color-white;
  padding: $space-100;
  max-width: 320px;
  max-height: var(--panel-max-height);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
  @include hide-scrollbar();

  &:empty {
    display: none;
  }

  .mc-button {
    &--size-m {
      font-weight: $font-weight-medium;
      padding: $space-100;
      .mc-svg-icon {
        @include size($size-300);
      }
    }
  }
}
</style>
