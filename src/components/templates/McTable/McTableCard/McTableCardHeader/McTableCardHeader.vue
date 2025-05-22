<script setup lang="ts">
import { McButton, McSvgIcon } from '@/components'
import { ButtonSize } from '@/enums'
import type { PropType } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types'

const props = defineProps({
  buttonBackText: {
    type: String as PropType<string>,
    default: 'Back'
  },
  backTo: {
    type: String as PropType<string>,
    default: null
  }
})

const theme = useTheme('tableCard')
</script>

<template>
  <section class="mc-table-card-header">
    <div class="mc-table-card-header__left">
      <!-- @slot Слот контента -->
      <slot>
        <mc-button
          :to="props.backTo"
          exact
          :variation="`${theme.component.backLink}-link` as ColorTypes"
          :size="ButtonSize.Xs"
        >
          <template #icon-prepend>
            <mc-svg-icon name="arrow_backward" />
          </template>
          {{ props.buttonBackText }}
        </mc-button>
      </slot>
    </div>
    <div class="mc-table-card-header__right">
      <!-- @slot right -->
      <slot name="right" />
    </div>
  </section>
</template>

<style lang="scss">
@use '../../../../../assets/styles/mixins' as *;
@use '../../../../../assets/tokens/colors' as *;
@use '../../../../../assets/tokens/spacings' as *;
.mc-table-card-header {
  $block-name: &;

  display: flex;
  flex-wrap: nowrap;
  background-color: $color-white;
  padding: 0;
  padding-inline: $space-150 $space-200;
  align-items: center;
  height: 100%;

  &__left,
  &__right {
    @include layout-flex-fix();
    display: flex;
    flex-wrap: nowrap;
    @include child-indent-right($space-200);

    &:empty {
      display: none;
    }
  }

  &__left {
    margin-inline-end: auto;
  }

  &__right {
    margin-inline-start: auto;
  }
}
</style>
