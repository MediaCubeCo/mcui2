<script setup lang="ts">
import { McTitle, McSvgIcon, McButton, McPreview } from '@/components'
import { computed, type PropType } from 'vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import type { IconsListUnion } from '@/types/styles/Icons'
import { Weights } from '@/enums/ui/Weights'


const emit = defineEmits(['click'])
const props = defineProps({
  /**
   * Дизайн:
   * purple, red, orange и т.д.
   */
  variation: {
    type: String as () => ColorTypes,
    default: 'purple' as ColorTypes,
  },
  /**
   * Заголовок блока
   */
  title: {
    type: String as PropType<string>,
  },
  /**
   * Содержимое блока
   */
  content: {
    type: String as PropType<string>,
    default: null,
  },
  /**
   * Отобразить кнопку внтури блока
   */
  buttonVisible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * Текст кнопки
   */
  buttonText: {
    type: String as PropType<string>,
    default: '',
  },
  /**
   * Название иконки
   */
  iconName: {
    type: String as () => IconsListUnion,
    default: 'info' as IconsListUnion,
  },
  /**
   * Отображать иконку
   */
  iconVisible: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-notification-color': Colors[props.variation],
  }
})

const handleClick = (e: Event):void => {
  /**
   * Событие клика по кнопке
   */
  emit('click', e)
}
</script>

<template>
  <div class="mc-notification" :style="styles">
    <div class="mc-notification__inner">
      <mc-preview>
        <template v-if="props.iconVisible && ($slots.left || props.iconName)" #left>
          <!-- @slot Слот для иконки -->
          <slot name="left">
            <mc-svg-icon :name="props.iconName" size="300" />
          </slot>
        </template>

        <template v-if="$slots.header || props.title" #top>
          <!-- @slot Слот заголовка -->
          <slot name="header">
            <mc-title
              v-if="props.title"
              :color="props.variation"
              :weight="Weights.SemiBold"
              class="mc-notification__title"
            >
              {{ props.title }}
            </mc-title>
          </slot>
        </template>

        <template v-if="props.content || $slots.default" #bottom>
          <div class="mc-notification__text">
            <!-- @slot Слот для контента -->
            <slot>
              <mc-title :color="props.variation">{{ props.content }}</mc-title>
            </slot>
          </div>
        </template>

        <template v-if="$slots.right || props.buttonVisible" #right>
          <!-- @slot Слот для кнопок -->
          <slot name="right">
            <mc-button
              v-if="props.buttonVisible"
              :variation="props.variation"
              class="mc-notification__button"
              @click="handleClick"
            >
              {{ props.buttonText }}
            </mc-button>
          </slot>
        </template>
      </mc-preview>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/media-queries' as *;
@use '../../../assets/tokens/border-radius' as *;
.mc-notification {
  $block-name: &;
  --mc-notification-color: #{$color-orange};
  position: relative;
  background-color: $color-white;
  border-radius: $radius-150;
  overflow: hidden;
  &:before {
    content: '';
    @include position(absolute, 0 null null 0);
    display: block;
    height: 100%;
    width: $size-50;
    background-color: var(--mc-notification-color);
  }

  &__text {
    font-size: $font-size-200;
    line-height: $line-height-200;
  }

  #{$block-name}__text,
  #{$block-name}__title {
    filter: contrast(59%);
  }

  &__inner {
    padding: $space-100 $space-150 $space-100 $space-200;
    min-height: $size-700;
    display: flex;
    align-items: center;
    position: relative;
    color: var(--mc-notification-color);
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--mc-notification-color);
      opacity: 0.1;
    }

    .mc-preview {
      width: 100%;
      z-index: 1;
      &__top {
        margin-bottom: $space-50;
      }
      &__left {
        display: flex;
        align-items: center;
        margin-inline-end: $size-150;
      }
      &__right {
        display: flex;
        align-items: center;
        margin-inline-start: auto;
        padding-inline-start: $space-100;
      }
    }

    @media #{$media-query-m-down} {
      .mc-preview {
        flex-wrap: wrap;

        &__center {
          flex: 1;
        }
        &__right {
          width: 100%;
          padding-top: $space-100;
          padding-inline-start: $size-400 - 2;
        }
      }
    }
  }
}
</style>
