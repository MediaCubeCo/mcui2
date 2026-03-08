<script setup lang="ts">
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { ButtonSize } from '@/enums/ui/Button'
import type { PropType } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types/styles/Colors'

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

<style lang="scss" src="./index.scss"></style>
