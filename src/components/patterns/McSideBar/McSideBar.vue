<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  type PropType,
  provide,
  reactive,
  ref,
  watch
} from 'vue'
import McSideBarTop from '@/components/patterns/McSideBar/McSideBarTop/McSideBarTop.vue'
import McSideBarCenter from '@/components/patterns/McSideBar/McSideBarCenter/McSideBarCenter.vue'
import McSideBarBottom from '@/components/patterns/McSideBar/McSideBarBottom/McSideBarBottom.vue'
import type {
  IconsListUnion,
  ISideBarApp, ISideBarChatra,
  ISideBarMenuItem,
  ISidebarThemeConfig, ISidebarThemeConfigProvide,
  TitleVariationsUnion
} from '@/types'
import { defaultThemes } from '@/mocks/sidebar'
import { SidebarTheme, TitleVariations } from '@/enums'

const emit = defineEmits<{
  (e: 'absolute-mode', value: boolean): void
  (e: 'hidden-mode', value: boolean): void
  (e: 'compact', value: boolean): void
  (e: 'chatraClick'): void
}>()
const props = defineProps({
  /**
   *  Название сервиса
   *
   */
  logoTitle: {
    type: String as PropType<string>,
    default: 'Dashboard'
  },
  /**
   *  Размер текста названия сервиса
   *
   */
  logoTitleVariation: {
    type: String as () => TitleVariationsUnion,
    default: TitleVariations.Subtitle
  },
  /**
   *  Путь до изображения
   *
   */
  logoSrc: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Имя иконки
   *  заголовка
   */
  logoIcon: {
    type: String as () => IconsListUnion,
    default: ''
  },
  /**
   *  Заголовок
   *  центрального блока
   */
  menuMainTitle: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Центральное меню
   *
   */
  menuMain: {
    type: Array as PropType<ISideBarMenuItem[]>,
    default: () => []
  },
  /**
   *  Каунты для пунктов меню
   *  вставляются в пункты с ключем 'count_key'
   *
   */
  counts: {
    type: Object as PropType<Record<string, number | null>>,
    default: () => ({})
  },
  /**
   *  Меню приложений
   *
   */
  menuApps: {
    type: Array as PropType<ISideBarApp[]>,
    default: () => []
  },
  /**
   *  Config чатры
   *
   */
  chatraConfig: {
    type: Object as PropType<ISideBarChatra>,
    default: () => ({})
  },
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
  /**
   * Цветовая схема
   */
  variable: {
    type: String as PropType<SidebarTheme>,
    default: SidebarTheme.Black
  },
  /**
   * Ширина сайдбара
   */
  width: {
    type: String as PropType<string>,
    default: '216px'
  },
  /**
   * Ширина компактного сайдбара
   */
  compactWidth: {
    type: String as PropType<string>,
    default: '56px'
  },
  /**
   * Брейкпоинт после которого
   * сайдбар становится абсолютным и появляется затемненный бэкдроп
   */
  absoluteBreakpoint: {
    type: Number as PropType<number>,
    default: null
  },
  /**
   * Брейкпоинт после которого
   * сайдбар полностью прячется
   */
  hiddenBreakpoint: {
    type: Number as PropType<number>,
    default: null
  }
})

const is_hidden = ref<boolean>(false)
const pretty_compact = ref<boolean>(props.compact)
const has_compact_class = ref<boolean>(props.compact)
const window_width = ref<number>(0)

const sideBarClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-side-bar--compact': has_compact_class.value,
    [currentThemeConfig.value.className]: true
  }
})

const sideBarStyles = computed((): { [key: string]: string } => {
  return {
    overflow: `${is_hidden.value ? 'hidden' : 'visible'}`,
    width: has_compact_class.value ? props.compactWidth : props.width
  }
})

const wrapperStyles = computed((): { [key: string]: string | undefined } => {
  const position =
    hiddenMode.value && has_compact_class.value
      ? {
          position: 'absolute',
          left: `-${props.compactWidth}`
        }
      : {}

  let width = {
    width: has_compact_class.value ? props.compactWidth : props.width
  }
  if (absoluteMode.value) {
    width.width = props.compactWidth
  }
  if (hiddenMode.value) {
    width.width = '0px'
  }
  return {
    ...width,
    ...position
  }
})

const backdropClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-side-bar-wrapper__backdrop--full-width':
      !has_compact_class.value && window_width.value < props.absoluteBreakpoint
  }
})

const absoluteMode = computed((): boolean => {
  return !!props.absoluteBreakpoint && window_width.value < props.absoluteBreakpoint
})

const hiddenMode = computed((): boolean => {
  return !!props.hiddenBreakpoint && window_width.value < props.hiddenBreakpoint
})

const currentThemeConfig = computed((): ISidebarThemeConfig => {
  return sidebarThemeConfig.value[props.variable] || sidebarThemeConfig.value[SidebarTheme.Black]
})

const sidebarThemeConfig = computed((): Record<SidebarTheme, ISidebarThemeConfig> => {
  return {
    black: defaultThemes.black,
    white: defaultThemes.white
  }
})

onMounted((): void => {
  if (props.absoluteBreakpoint || (props.hiddenBreakpoint && window)) {
    resize()
    window.addEventListener('resize', resize)
  }
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', resize)
})

const handleToggleSize = (): void => {
  has_compact_class.value = !has_compact_class.value
  emit('compact', has_compact_class.value)
}

const openSideBar = (): void => {
  has_compact_class.value = false
  emit('compact', has_compact_class.value)
}

const resize = (): void => {
  window_width.value = window.innerWidth
}

watch(
  () => has_compact_class.value,
  (value: boolean): void => {
    if (value) {
      setTimeout((): void => {
        pretty_compact.value = value
      }, 280)
    } else {
      pretty_compact.value = value
    }
    is_hidden.value = true
    setTimeout((): void => {
      is_hidden.value = false
    }, 280)
  }
)

watch(
  () => props.compact,
  (value: boolean): void => {
    has_compact_class.value = value
  }
)

watch(
  () => absoluteMode.value,
  (value: boolean): void => {
    emit('absolute-mode', value)
  },
  { immediate: true }
)

watch(
  () => hiddenMode.value,
  (value: boolean): void => {
    emit('hidden-mode', value)
  },
  { immediate: true }
)

provide('provideData', reactive<ISidebarThemeConfigProvide>({ currentThemeConfig: currentThemeConfig.value }))
</script>

<template>
  <article ref="sidebar-wrapper" class="mc-side-bar-wrapper" :style="wrapperStyles">
    <section
      class="mc-side-bar-wrapper__backdrop"
      :class="backdropClasses"
      @click.stop.prevent="handleToggleSize"
    >
      <div
        ref="sidebar"
        class="mc-side-bar"
        :class="sideBarClasses"
        :style="sideBarStyles"
        @click.stop
      >
        <mc-side-bar-top
          :logo-title="logoTitle"
          :logo-title-variation="logoTitleVariation"
          :logo-src="logoSrc"
          :logo-icon="logoIcon"
          :compact="pretty_compact"
          :menu-apps="menuApps"
        >
          <template #title-append>
            <slot name="title-append" />
          </template>
        </mc-side-bar-top>
        <section class="mc-side-bar__scrollable-container">
          <mc-side-bar-center
            :title="menuMainTitle"
            :menu-main="menuMain"
            :counts="counts"
            :chatra-config="chatraConfig"
            :compact="pretty_compact"
            @handlerChatraClick="emit('chatraClick')"
            @open-side-bar="openSideBar"
          />
          <mc-side-bar-bottom
            :hide-text="hideText"
            :compact="pretty_compact"
            :hidden-mode="hiddenMode"
            :sidebar-width="width"
            @toggle-size="handleToggleSize"
          >
            <template #bottom-message>
              <slot name="bottom-message" />
            </template>
          </mc-side-bar-bottom>
        </section>
      </div>
    </section>
  </article>
</template>

<style lang="scss">
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/spacings';
@import '../../../assets/tokens/colors';
.mc-side-bar {
  $block-name: &;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: $space-250 $space-100 $space-400;
  transition: width 300ms ease;
  overflow-x: hidden;
  overflow-y: auto;
  @include child-indent-bottom($space-400);
  &--color-theme-black {
    background-color: $color-black;
  }
  &--color-theme-white {
    background-color: $color-white;
    border-inline-end: 1px solid $color-hover-gray;
  }
  &__scrollable-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    @include hide-scrollbar;
  }
  &-wrapper {
    height: 100%;
    transition: width 300ms ease;
    &__backdrop {
      position: absolute;
      background-color: rgba($color-black, 0.6);
      z-index: 25;
      height: inherit;
      .mc-side-bar {
        height: inherit;
      }
      &--full-width {
        width: 100%;
      }
    }
  }
}
</style>
