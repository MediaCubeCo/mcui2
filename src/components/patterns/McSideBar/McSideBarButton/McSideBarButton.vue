<script setup lang="ts">
import type { ButtonVariationUnion } from '@/types/IButton'
import type { ColorTypes } from '@/types/styles/Colors'
import type { IconsListUnion } from '@/types/styles/Icons'
import type { ISidebarThemeConfigProvide } from '@/types/ISideBar'
import { computed, defineAsyncComponent, inject, type PropType, useAttrs } from 'vue'
import { ButtonSize } from '@/enums/ui/Button'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { SidebarTheme } from '@/enums/Sidebar'
import { TooltipPositions } from '@/enums/Tooltip'
import { defaultThemes } from '@/mocks/sidebar'
import { useTheme } from '@/composables/useTheme'
const McButton = defineAsyncComponent(() => import('@/components/elements/McButton/McButton.vue'))
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))
const McChip = defineAsyncComponent(() => import('@/components/elements/McChip/McChip.vue'))

const attrs = useAttrs()
const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const props = defineProps({
  /**
   *  Если нужна ссылка внутри приложения:
   */
  to: {
    type: String as PropType<string>
  },
  /**
   *  Если нужна обычная ссылка:
   * `https://mcpay.io/`
   */
  href: {
    type: String as PropType<string>
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
    'mc-side-bar-button__compact': props.compact,
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
    '--mc-sidebar-button-active-link-color': theme.colors[theme.component.activeLink as ColorTypes]
  }
})
</script>

<template>
  <mc-button v-bind="btnAttrs" :target="props.href ? '_blank' : '_self'" :class="classes" :style="styles">
    <template #icon-prepend>
      <mc-svg-icon v-if="icon" :fill="iconColor" class="mc-side-bar-button__icon" :name="icon" />
      <span v-if="icon && compact && (info || withIndicator)" class="mc-side-bar-button__dot" />
    </template>
    <template v-if="!compact">{{ title }}</template>
    <template #icon-append>
      <mc-chip
        v-if="(info || withIndicator) && !compact"
        :variation="theme.component.chip as ColorTypes"
        text-color="white"
        class="mc-side-bar-button__chip"
        :class="{ indicator: withIndicator }"
      >
        {{ withIndicator ? '' : info }}
      </mc-chip>
      <mc-svg-icon
        v-if="href"
        :fill="iconColor"
        size="250"
        name="link_external_new"
        class="mc-side-bar-button__icon-append"
      />
    </template>
  </mc-button>
</template>

<style lang="scss" src="./index.scss"></style>
