<script setup lang="ts">
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McPreview from '@/components/patterns/McPreview/McPreview.vue'
import { computed, type PropType, useSlots } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { IconsListUnion } from '@/types/styles/Icons'
import { Weights } from '@/enums/ui/Weights'
import { useTheme } from '@/composables/useTheme'


const emit = defineEmits(['click'])
const slots = useSlots()
const props = defineProps({
  /**
   * Дизайн:
   * purple, red, orange и т.д.
   */
  variation: {
    type: String as () => ColorTypes,
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

const theme = useTheme('notification')

const computedVariation = computed((): ColorTypes => {
  return props.variation || theme.component.variation as ColorTypes
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-notification-color': theme.colors[computedVariation.value],
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
              :color="computedVariation"
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
              <mc-title :color="computedVariation">{{ props.content }}</mc-title>
            </slot>
          </div>
        </template>

        <template v-if="$slots.right || props.buttonVisible" #right>
          <!-- @slot Слот для кнопок -->
          <slot name="right">
            <mc-button
              v-if="props.buttonVisible"
              :variation="computedVariation"
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

<style lang="scss" src="./index.scss"></style>
