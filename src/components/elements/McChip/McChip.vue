<script setup lang="ts">
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { computed, type PropType, useSlots } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import { ChipSizeModifiersUnion, ChipVariationUnion, IChipStyleOptions } from '@/types/IChip'
import type { ColorsUnion } from '@/types/styles/Colors'
import { ChipModifiers } from '@/enums/Chip'
import { useTheme } from '@/composables/useTheme'

const theme = useTheme('chip')
const slots = useSlots()
const emit = defineEmits(['close', 'click'])
const props = defineProps({
  /**
   *  Text content
   *
   */
  title: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   *  Кнопка закрытия
   *
   */
  closable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   *  Дизайн:
   *  `purple, purple-invert т.д.`
   */
  variation: {
    type: String as () => ChipVariationUnion,
  },
  /**
   *  Счетчик
   *
   */
  counter: {
    type: [String, Number] as PropType<string | number>,
    default: null,
  },
  /**
   *  Размер
   */
  size: {
    type: String as () => ChipSizeModifiersUnion,
    default: 'm',
  },
  /**
   *  Если нужен
   *  иной цвет текста
   */
  textColor: {
    type: String as () => ColorTypes,
  },
})

const computedVariation = computed(() => {
  return props.variation || theme.component.variation as ColorTypes
})
const computedTextColor = computed((): ColorTypes => {
  return props.textColor || theme.component.textColor as ColorTypes
})

const classes = computed((): { [key: string]: boolean } => ({
  [`mc-chip--variation-${chipOptions.value.variation}`]: !!computedVariation.value,
  [`mc-chip--size-${props.size}`]: !!props.size,
}))

const chipOptions = computed((): IChipStyleOptions => {
  const variationProps = computedVariation.value?.split('-')
  const currentVariation = variationProps[variationProps.length - 1]
  let color
  let variation
  switch (currentVariation) {
    case ChipModifiers.Outline:
    case ChipModifiers.Invert: {
      variation = currentVariation
      color = computedVariation.value.replace(`-${currentVariation}`, '')
      break
    }
    default: {
      variation = 'default'
      color = computedVariation.value
      break
    }
  }
  return {
    color: color as ColorTypes,
    variation,
  }
})

const styles = computed((): { [key: string]: ColorsUnion } => {
  const textColor = computedTextColor.value || 'white'
  return {
    '--mc-chip-color': theme.colors[chipOptions.value.color as ColorTypes],
    '--mc-chip-text-color': theme.colors[textColor],
  }
})

const handleCloseClick = (e: Event): void => {
  emit('close', e)
}
const handleClick = (e: Event): void => {
  emit('click', e)
}
</script>

<template>
  <section class="mc-chip" tabindex="0" :class="classes" :style="styles" @click="handleClick">
    <div v-if="$slots.icon" class="mc-chip__icon">
      <!-- @slot Слот для иконки -->
      <slot name="icon" />
    </div>
    <div v-if="title || $slots.default" class="mc-chip__title">
      <!-- @slot Слот для контента -->
      <slot>
        {{ title }}
      </slot>
    </div>
    <div v-if="counter || counter === 0" class="mc-chip__counter">
      {{ counter }}
    </div>
    <button v-if="closable" class="mc-chip__button" type="button" @click.stop="handleCloseClick">
      <!-- @slot Слот для пользовательской кнопки -->
      <slot name="button">
        <mc-svg-icon size="200" name="cancel" />
      </slot>
    </button>
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
