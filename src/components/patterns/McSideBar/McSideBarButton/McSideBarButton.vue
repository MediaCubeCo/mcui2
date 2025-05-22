<script setup lang="ts">
import { McButton, McSvgIcon, McChip } from '@/components'
import type { ButtonVariationUnion, ColorTypes, IconsListUnion, ISidebarThemeConfigProvide } from '@/types'
import { computed, inject, type PropType, useAttrs } from 'vue'
import { ButtonSize, HorizontalAlignment, SidebarTheme, TooltipPositions } from '@/enums'
import { defaultThemes } from '@/mocks/sidebar'
import { useTheme } from '@/composables/useTheme'

const attrs = useAttrs()
const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const props = defineProps({
  /**
   *  Если нужна ссылка внутри приложения:
   */
  to: {
    type: Object as PropType<string>,
    default: null
  },
  /**
   *  Если нужна обычная ссылка:
   * `https://mcpay.io/`
   */
  href: {
    type: String as PropType<string>,
    default: null
  },
  /**
   *  Если нужна иконка
   */
  icon: {
    type: String as () => IconsListUnion,
    default: ''
  },
  /**
   *  Если нужен конкретный
   *  цвет иконки
   */
  iconColor: {
    type: String as () => ColorTypes,
    default: 'currentColor'
  },
  /**
   *  Тайтл кнопки
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Compact size
   */
  compact: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Дизайн:
   *  `purple, red, purple-outline, purple-invert, purple-flat и т.д.`
   */
  variation: {
    type: String as () => ButtonVariationUnion
  },
  /**
   * Если нужен другой цвет при взаимодействии
   */
  secondaryColor: {
    type: String as () => ColorTypes
  },
  withTooltip: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  withIndicator: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isActive: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Additional info
   */
  info: {
    type: [String, Number] as PropType<string | number | null>,
    default: ''
  },
  /**
   *  Exact
   *
   */
  exact: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Отключенное состояние
   *
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const theme = useTheme('sidebar')

const themeConfig = computed(() => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const classes = computed(() => {
  return {
    'mc-side-bar-button': true,
    [`mc-side-bar--${themeConfig.value.mode || 'black'}__button`]: true,
    'purple-hover': !props.secondaryColor && themeConfig.value.mainMenuLinks.variable === 'black-flat',
    //@ts-ignore
    [attrs.class]: !!attrs.class
  }
})

const btnAttrs = computed(() => {
  return {
    ...attrs,
    variation: props.variation || themeConfig.value.mainMenuLinks.variable,
    secondaryColor: props.secondaryColor || themeConfig.value.mainMenuLinks.secondaryColor,
    textAlign: HorizontalAlignment.Left,
    fullWidth: true,
    size: props.compact ? ButtonSize.SCompact : ButtonSize.S,
    href: props.href,
    to: props.to,
    exact: props.exact,
    disabled: props.disabled,
    isActive: props.isActive,
    tooltip: props.compact && props.withTooltip ? props.title : '',
    tooltipPlacement: TooltipPositions.Right
  }
})
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-sidebar-button-chip-color': theme.colors[theme.component.chip as ColorTypes],
    '--mc-sidebar-button-active-link-color': theme.colors[theme.component.activeLink as ColorTypes],
  }
})
</script>

<template>
  <mc-button v-bind="btnAttrs" :class="classes" :style="styles">
    <template #icon-prepend>
      <mc-svg-icon v-if="icon" :fill="iconColor" class="mc-side-bar-button__icon" :name="icon" />
      <span v-if="icon && compact && (info || withIndicator)" class="mc-side-bar-button__dot" />
    </template>
    <template v-if="!compact">{{ title }}</template>
    <template v-if="!compact" #icon-append>
      <mc-chip
        v-if="info || withIndicator"
        :variation="theme.component.chip as ColorTypes"
        class="mc-side-bar-button__chip"
        :class="{ indicator: withIndicator }"
      >
        {{ withIndicator ? '' : info }}
      </mc-chip>
    </template>
  </mc-button>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/border-radius' as *;
.mc-side-bar-button {
  $block-name: &;
  &__tooltip {
    width: 100%;
  }
  &__dot {
    @include position(absolute, $space-100 6px null null);
    @include size($size-100);
    background-color: var(--mc-sidebar-button-chip-color);
    border-radius: $radius-circle;
  }
  &__chip {
    &.indicator {
      margin: 6px;
      padding: 0 !important;
      width: $size-150;
      min-height: $size-150;
    }
  }
  &.mc-button {
    padding: $space-100;
    opacity: 1;
    height: auto;
    border-radius: $space-50;
    justify-content: flex-start;
    .mc-svg-icon {
      @include size($size-300);
    }
    &.purple-hover:hover {
      background-color: $color-lighter-purple;
    }

    .mc-button__text {
      margin-inline-end: $space-100;
    }
    .mc-button__prepend {
      margin-inline-end: $space-100;
    }
    .mc-button__append {
      margin-inline-start: auto;
    }
    .mc-chip {
      height: auto;
      padding: $space-50 $space-100;
      font-variant-numeric: tabular-nums;
    }
  }
}
.mc-side-bar {
  &--black__button {
    &.mc-button--is-active,
    &.mc-button.nuxt-link-active {
      color: $color-white;
      background-color: rgba(92, 102, 112, 0.4);
      pointer-events: auto;
    }
  }
  &--white__button {
    &.mc-button--is-active,
    &.mc-button.nuxt-link-active {
      color: var(--mc-sidebar-button-active-link-color);
      background-color: $color-lighter-purple;
      pointer-events: auto;
    }
  }
}
</style>
