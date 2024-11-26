<script setup lang="ts">
import { McDropdown, McButton, McSvgIcon, McPreview, McTitle } from '@/components'
import { computed, inject, type PropType, ref } from 'vue'
import { useHelper } from '@/composables'
import { ButtonSize, DropdownPositions, HorizontalAlignment, SidebarTheme, TitleVariations, Weights } from '@/enums'
import type {
  ButtonVariationUnion,
  DropdownPositionsUnion,
  IconsListUnion,
  ISideBarApp,
  ISidebarThemeConfig,
  ISidebarThemeConfigProvide,
  TitleVariationsUnion
} from '@/types'
import { defaultThemes } from '@/mocks/sidebar'

const helper = useHelper()
const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const props = defineProps({
  /**
   *  Меню приложений
   *
   */
  menuApps: {
    type: Array as PropType<ISideBarApp[]>,
    default: () => []
  },
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
  dropdownPosition: {
    type: String as () => DropdownPositionsUnion,
    default: DropdownPositions.Left
  },
  /**
   *  Компактный вид
   */
  compact: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const dropIsOpen = ref<boolean>(false)

const themeConfig = computed((): ISidebarThemeConfig => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const computedMenuApps = computed((): ISideBarApp[] | null => {
  if (helper.isEmpty(props.menuApps)) return null
  return props.menuApps.filter((app) => !Object.prototype.hasOwnProperty.call(app, 'isVisible') || app.isVisible)
})
</script>

<template>
  <div class="mc-side-bar-top" :class="`mc-side-bar-top--theme-${themeConfig.dropdownActivator}`">
    <mc-preview v-if="!computedMenuApps">
      <template v-if="logoSrc" #left>
        <img class="mc-side-bar-top__img" :src="logoSrc" width="24" height="24" :alt="logoTitle" />
      </template>
      <template #top>
        <mc-title v-if="!compact" :weight="Weights.SemiBold" :variation="logoTitleVariation">
          {{ logoTitle }}
          <template #icon-append>
            <slot name="title-append" />
          </template>
        </mc-title>
      </template>
    </mc-preview>
    <mc-dropdown v-else v-model="dropIsOpen" :position="dropdownPosition" :items="computedMenuApps">
      <template #activator>
        <mc-preview>
          <template #left>
            <img v-if="logoSrc" class="mc-side-bar-top__img" :src="logoSrc" width="24" height="24" :alt="logoTitle" />
            <mc-svg-icon v-else-if="logoIcon" class="rotate" :name="logoIcon" />
          </template>
          <template #top>
            <mc-button
              :variation="`${themeConfig.dropdownActivator}-link` as ButtonVariationUnion"
              :size="compact ? ButtonSize.LCompact : ButtonSize.L"
              class="mc-side-bar-top__activator-btn"
            >
              <mc-title v-if="!compact" :weight="Weights.SemiBold" :variation="logoTitleVariation">
                {{ logoTitle }}
                <template #icon-append>
                  <slot name="title-append" />
                </template>
              </mc-title>
              <template #icon-append>
                <mc-svg-icon class="rotate" name="arrow_drop_down" color="gray" />
              </template>
            </mc-button>
          </template>
        </mc-preview>
      </template>
      <template #item="{ item }">
        <mc-button
          full-width
          :text-align="HorizontalAlignment.Left"
          variation="black-flat"
          :href="item.href"
          :to="item.to"
          :target="item.target"
          :is-active="item.isActive"
          :exact="item.exact"
        >
          <template #icon-prepend>
            <mc-svg-icon v-if="item.icon" :name="item.icon" />
            <img v-else-if="item.image" :src="item.image" width="24" height="24" alt="service image" />
          </template>
          {{ item.name }}
        </mc-button>
      </template>
    </mc-dropdown>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/line-heights' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/font-sizes' as *;
.mc-side-bar-top {
  $block-name: &;
  @include reset-text-indents();
  position: sticky;
  top: -($space-250);
  padding: $space-250 $space-100;
  background: $color-white;
  margin: -($space-250) (-($space-100)) $space-150 !important;
  z-index: 2;
  .mc-dropdown__toggle {
    &:hover {
      cursor: pointer;
    }
    .mc-preview__left {
      margin-inline-end: 0;
    }
    .mc-button {
      line-height: $line-height-250;
      &__text {
        margin-inline-start: $space-100;
      }
      &__append {
        margin-inline-start: 0;
      }
      .rotate {
        @include size($size-200);
      }
    }
  }
  &__img {
    margin-inline-start: $space-100;
  }
  &__activator-btn {
    font-size: $font-size-400;
    line-height: $line-height-300;
  }
  &--theme-white {
    background: $color-black;
    .mc-preview__top {
      .mc-title {
        color: $color-white;
      }
    }
  }
  &--theme-black {
    background: $color-white;
    .mc-preview__top {
      .mc-title {
        color: $color-black;
      }
    }
  }
}
</style>
