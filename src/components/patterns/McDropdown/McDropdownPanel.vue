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
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/box-shadows';
@import '../../../assets/tokens/colors';
@import '../../../assets/tokens/spacings';
@import '../../../assets/tokens/font-families';
@import '../../../assets/tokens/font-weights';
@import '../../../assets/tokens/sizes';
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
