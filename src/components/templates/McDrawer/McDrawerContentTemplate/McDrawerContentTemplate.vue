<script setup lang="ts">
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import { McTitle } from '@/components'
import type { PropType } from 'vue'
import { useSlots } from 'vue'
import { useHasSlot } from '@/composables'

const slots = useSlots()
const { hasSlot } = useHasSlot(slots)

const props = defineProps({
  /**
   * Заголовок
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  titleEllipsis: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})
</script>

<template>
  <div class="mc-drawer-content-template">
    <div v-if="hasSlot('title') || props.title" class="mc-drawer-content-template__header">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title :variation="TitleVariations.Subtitle" :ellipsis="props.titleEllipsis" :weight="Weights.SemiBold">
          {{ props.title }}
        </mc-title>
      </slot>
    </div>
    <div class="mc-drawer-content-template__body">
      <div class="mc-drawer-content-template__tint"></div>
      <div class="mc-drawer-content-template__body-inner">
        <!-- @slot Слот контента -->
        <slot />
      </div>
    </div>
    <div v-if="hasSlot('footer')" class="mc-drawer-content-template__footer">
      <!-- @slot Слот футера -->
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/font-families' as *;
.mc-drawer-content-template {
  font-family: $font-family-main;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__header {
    padding: 18px $space-600 18px $space-200;
    border-bottom: 1px solid $color-hover-gray;
  }

  &__body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    height: 100%;
    &-inner {
      max-height: 100%;
      height: 100%;
      overflow-y: auto;
      padding: $space-400 $space-200;
      box-sizing: border-box;
    }
  }
  &__footer {
    border-top: 1px solid $color-hover-gray;
    padding: $space-200 $space-200;
  }

  &__tint {
    @include position(absolute, 0 5px null 0);
    height: $size-400;
    background: linear-gradient(180deg, $color-white 0%, rgba(255, 255, 255, 0) 100%);
  }
}
</style>
