<script setup lang="ts">
import McSideBarButton from '@/components/patterns/McSideBar/McSideBarButton/McSideBarButton.vue'
import { computed, inject, type PropType } from 'vue'
import type { ButtonVariationUnion, ColorTypes, ISidebarThemeConfigProvide } from '@/types'
import { defaultThemes } from '@/mocks/sidebar'
import { SidebarTheme } from '@/enums'

const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const emit = defineEmits<{
  (e: 'toggle-size', value: boolean): void
}>()
const props = defineProps({
  /**
   *  Текст кнопки
   *  сворачивания меню
   */
  hideText: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Компактный вид
   */
  compact: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  hiddenMode: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  sidebarWidth: {
    type: String as PropType<string>,
    default: null
  }
})

const themeConfig = computed(() => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const closeButtonProps = computed((): { variable: ButtonVariationUnion; secondaryColor: ColorTypes } => {
  return themeConfig.value?.closeButton
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-side-bar-bottom--compact': props.compact
  }
})

const messageStyles = computed((): { [key: string]: string } => {
  return {
    minWidth: props.sidebarWidth
  }
})

const handleClick = (): void => {
  emit('toggle-size', !props.compact)
}
</script>

<template>
  <div class="mc-side-bar-bottom" :class="classes">
    <div v-if="!compact && $slots['bottom-message']" class="mc-side-bar-bottom__slot-message" :style="messageStyles">
      <slot name="bottom-message" />
    </div>
    <mc-side-bar-button
      v-if="!hiddenMode"
      class="mc-side-bar-bottom__hide-button"
      icon="arrow_backward"
      :title="hideText"
      :compact="compact"
      :variation="closeButtonProps.variable"
      :secondary-color="closeButtonProps.secondaryColor"
      @click.stop.prevent="handleClick"
    />
  </div>
</template>

<style lang="scss">
@import '../../../../assets/tokens/durations';
@import '../../../../assets/tokens/spacings';
.mc-side-bar-bottom {
  $block-name: &;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: flex-end;
  min-height: max-content;

  &__hide-button {
    .mc-side-bar-button__icon {
      transition: transform $duration-s;
    }
  }

  &--compact {
    #{$block-name}__hide-button {
      .mc-side-bar-button__icon {
        transform: rotate(180deg);
      }
    }
  }
  &__slot-message {
    margin-inline-start: -$space-100;
    margin-inline-end: -$space-100;
    padding-inline-start: $space-100;
    padding-inline-end: $space-100;
    & + * {
      margin-top: $space-500;
    }
  }
}
</style>
