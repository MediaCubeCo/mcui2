<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, type PropType, ref, useSlots } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import { FontWeights } from '@/types/styles/FontWeights'
import { useTooltip } from '@/composables/useTooltip'
import type { ITooltip, TooltipPositionsUnion } from '@/types/ITooltip'
import type { ButtonVariationUnion, IButtonStyleOptions } from '@/types/IButton'
import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import type { ButtonSizeUnion, ButtonTypeUnion } from '@/types/IButton'
import type { HorizontalAlignmentUnion } from '@/types/styles/Alignment'
import type { WeightsUnion } from '@/types/styles/Weights'
import type { ColorsUnion } from '@/types/styles/Colors'
import type { FontWeightsUnion } from '@/types/styles/FontWeights'
import { ButtonModifiers } from '@/enums/ui/Button'
import { IDSOptions } from '@/types/IDSOptions'
import { useTheme } from '@/composables/useTheme'

interface ElButtonTagBind {
  to?: string | null
  href?: string | null
  disabled: boolean
  rel: string
  type: ButtonTypeUnion
  tabindex: number | string | undefined | null
}

const dsOptions = inject<IDSOptions>('dsOptions', {})

const vTooltip = useTooltip()

const buttonTooltip = computed((): ITooltip => {
  let payload = {} as ITooltip
  if (props.tooltip) {
    payload = {
      content: props.tooltip,
      size: TooltipSizes.M,
      placement: props.tooltipPlacement || TooltipPositions.Top
    }
  }
  return payload
})

const props = defineProps({
  /**
   *  Если нужна ссылка внутри приложения:
   */
  to: {
    type: String as PropType<string>
  },
  /**
   *  Если нужна обычная ссылка:
   * `https://mediacube.agency/`
   */
  href: {
    type: String as PropType<string>
  },
  /**
   *  По умолчанию ожидается использование в `Nuxt`
   *
   */
  nuxt: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  target: {
    type: String as PropType<'_self' | '_blank'>,
    default: '_self'
  },
  /**
   *  Отключенное состояние
   *
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Дизэйблить не меняя внешнего вида
   *
   */
  inactive: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Индикация загрузки
   *
   */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Индикация загрузки
   *  вращением иконки
   */
  iconLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Типы:
   *  `button, submit, reset`
   */
  type: {
    type: String as () => ButtonTypeUnion,
    default: null
  },
  /**
   *  Дизайн:
   *  `purple, red, purple-outline, purple-invert, purple-flat и т.д.`
   */
  variation: {
    type: String as () => ButtonVariationUnion
  },
  /**
   *  Размеры:
   *  `xs, xs-compact, s, s-compact, m, m-compact, l, l-compact`
   */
  size: {
    type: String as () => ButtonSizeUnion,
    default: 'm'
  },
  /**
   *  Тень
   *
   */
  shadow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Круглая (применимо для *-compact size)
   *
   */
  rounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Закругленная
   *
   */
  semiRounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Позиция текста внутри кнопки:
   *  `left, center, right`
   */
  textAlign: {
    type: String as () => HorizontalAlignmentUnion,
    default: 'center'
  },
  /**
   *  На всю ширину
   *
   */
  fullWidth: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Если нужно активное состояние
   *
   */
  isActive: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  activeTextColor: {
    type: String as () => ColorTypes
  },
  /**
   *  exact
   *
   */
  exact: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Заглавные буквы
   */
  uppercase: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Тег по умолчанию
   */
  defaultTag: {
    type: String as PropType<string>,
    default: 'button'
  },
  /**
   * Если нужен другой цвет при взаимодействии
   */
  secondaryColor: {
    type: String as () => ColorTypes,
    default: null
  },
  /**
   * Если нужна подчёркнутая ссылка
   */
  underlineLink: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Если нужен постоянный
   * фон у типа 'flat'
   */
  bgFlat: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Жирность шрифта:
   * `normal, medium, semi-bold`
   */
  weight: {
    type: String as () => WeightsUnion,
    default: 'semi-bold'
  },
  /**
   * Тултип при наличии
   */
  tooltip: {
    type: String as PropType<string>,
    default: null
  },
  tooltipPlacement: {
    type: String as () => TooltipPositionsUnion,
    default: null
  },

  /**
   * Атрибут tabindex для главного элемента
   *
   */
  tabindex: {
    type: [String, Number]
  }
})

const theme = useTheme('button')
const slots = useSlots()
const mcButton = ref(null)
const has_click = ref(false)
const emit = defineEmits(['blur', 'click'])

const classes = computed((): { [key: string]: boolean } => {
  return {
    [`mc-button--variation-${props.variation}`]: !!props.variation,
    [`mc-button--size-${props.size}`]: !!props.size,
    [`mc-button--text-align-${props.textAlign}`]: !!props.textAlign,
    'mc-button--loading': !!props.loading,
    'mc-button--icon-loading': !!props.iconLoading,
    'mc-button--is-active': !!props.isActive,
    'mc-button--disabled': !!props.disabled,
    'mc-button--rounded': props.rounded && /-compact$/.test(props.size),
    'mc-button--semi-rounded': !!props.semiRounded,
    'mc-button--full-width': !!props.fullWidth,
    'mc-button--uppercase': !!props.uppercase,
    'mc-button--shadow': !!props.shadow,
    'mc-button--secondary-color': !!props.secondaryColor,
    'mc-button--underline-link': !!props.underlineLink,
    'mc-button--bg-flat': !!props.bgFlat,
    [`mc-button--type-${buttonVariation.value.type}`]: !!buttonVariation.value.type,
    'mc-button--inactive': !!props.inactive
  }
})

const computedVariation = computed(() => {
  return props.variation || (theme.component.variation as ColorTypes)
})

const buttonVariation = computed((): IButtonStyleOptions => {
  const variation = computedVariation.value
  const texts = variation.split('-')
  const currentStyle = texts[texts.length - 1]
  let color = variation.replace(`-${currentStyle}`, '')
  switch (currentStyle) {
    case ButtonModifiers.Link:
    case ButtonModifiers.Flat:
    case ButtonModifiers.Outline:
    case ButtonModifiers.Invert: {
      break
    }
    default: {
      color = variation
      break
    }
  }
  return {
    color: color as ColorTypes,
    type: currentStyle
  }
})

const styles = computed((): { [key: string]: ColorsUnion | FontWeightsUnion | string | undefined } => {
  let hoverBrightness: string | undefined
  let textColor: ColorTypes | undefined
  let textActiveColor = props.activeTextColor || theme.component.activeTextColor
  switch (buttonVariation.value.type) {
    case ButtonModifiers.Link:
    case ButtonModifiers.Flat:
    case ButtonModifiers.Outline:
    case ButtonModifiers.Invert: {
      break
    }
    default: {
      switch (buttonVariation.value.color) {
        case 'yellow':
        case 'white': {
          hoverBrightness = '0.9'
          break
        }
        case 'toxic': {
          break
        }
        default: {
          textColor = 'white' as ColorTypes
        }
      }
      break
    }
  }

  return {
    '--mc-button-secondary-color': props.secondaryColor && theme.colors[props.secondaryColor],
    '--mc-button-background-color': computedVariation.value && theme.colors[buttonVariation.value.color as ColorTypes],
    '--mc-button-active-text-color': textActiveColor && theme.colors[textActiveColor as ColorTypes],
    '--mc-button-font-weight': props.weight && FontWeights[props.weight],
    '--mc-button-hover-brightness': hoverBrightness,
    '--mc-button-text-color': textColor && theme.colors[textColor]
  }
})

const tag = computed((): string => {
  const defaultLink = 'a'
  if (props.to) {
    return defaultLink
  } else if (props.href) {
    return defaultLink
  }
  return props.defaultTag
})

const isVariationLink = computed((): boolean => {
  return buttonVariation.value.type === ButtonModifiers.Link
})

const tagBind = computed((): ElButtonTagBind => {
  let result: ElButtonTagBind = {
    to: props.to,
    href: props.href,
    disabled: false,
    rel: '',
    type: props.type,
    tabindex: props.tabindex
  }

  if (props.to) {
    delete result.href
  } else if (props.href) {
    delete result.to
  } else if (props.disabled || props.loading) {
    result.disabled = true
  }

  if (isVariationLink.value) result.rel = 'noreferrer'

  return result
})

const handleBlur = (e: Event): void => {
  emit('blur', e)
}
const handleClick = (e: Event): void => {
  //@ts-ignore
  if ((props.to || props.href) && (e.metaKey || e.ctrlKey)) return

  e.preventDefault()

  if (has_click.value) return emit('click', e, props)

  if (props.to) {
    if (dsOptions?.meta?.router) {
      dsOptions.meta.router.push(props.to)
    }
  } else window.open(props.href, props.target)
}

const checkHasClickListener = (): void => {
  const instance = getCurrentInstance()
  const parentVNode = instance?.vnode
  has_click.value = !!parentVNode?.props?.onClick
}

onMounted(checkHasClickListener)
</script>

<template>
  <component
    v-tooltip="buttonTooltip"
    :is="tag"
    :ref="mcButton"
    v-bind="{ ...tagBind }"
    class="mc-button"
    :class="classes"
    :exact="exact"
    :style="styles"
    @blur="handleBlur"
    @click="handleClick"
  >
    <span v-if="$slots['icon-prepend']" class="mc-button__prepend">
      <!-- @slot Слот для вставки в начало -->
      <slot name="icon-prepend" />
    </span>
    <span v-if="loading" class="mc-button__loader">
      <mc-svg-icon class="mc-button__loader-icon" type="div" name="loader" />
    </span>
    <span v-if="$slots.default" class="mc-button__text">
      <!-- @slot Слот по умолчанию -->
      <slot />
    </span>
    <span v-if="$slots['icon-append']" class="mc-button__append">
      <!-- @slot Слот для вставки в конец -->
      <slot name="icon-append" />
    </span>
    <div v-if="!isVariationLink" class="mc-button__background" />
  </component>
</template>

<style lang="scss" src="./index.scss"></style>
