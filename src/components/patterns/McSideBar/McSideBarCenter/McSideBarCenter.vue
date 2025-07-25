<script setup lang="ts">
import { McTitle, McSideBarButton, McSeparator, McButton, McSvgIcon } from '@/components'
import { useRandomNumber } from '@/composables'
import { computed, inject, nextTick, onBeforeMount, type PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ISideBarChatra, ISideBarMenuItem, ISideBarMenuItemEnrichment, ISidebarThemeConfigProvide } from '@/types'
import { ButtonSize, SidebarTheme } from '@/enums'
import McSlideUpDown from '@/components/elements/McSlideUpDown/McSlideUpDown.vue'
import { defaultThemes } from '@/mocks/sidebar'

const randomNumber = useRandomNumber()
const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const emit = defineEmits<{
  (e: 'open-side-bar'): void
  (e: 'handlerChatraClick'): void
}>()
const props = defineProps({
  /**
   *  Заголовок
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Центральное меню
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
   *  Id чатры
   *
   */
  chatraConfig: {
    type: Object as PropType<ISideBarChatra>,
    default: () => ({})
  },
  /**
   *  Компактный вид
   */
  compact: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const preparedMainMenu = ref<ISideBarMenuItemEnrichment[]>([])

const themeConfig = computed(() => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const getMenuItemHeadClasses = (menuMainItem: ISideBarMenuItemEnrichment) => {
  return {
    open: menuMainItem.open,
    active: menuMainItem.active,
    'with-submenu': menuMainItem.menu && menuMainItem.menu.length,
    [`mc-side-bar--${themeConfig.value.mode || 'black'}__button`]: true,
    'purple-hover': themeConfig.value.mainMenuLinks.variable === 'black-flat',
    [`mc-button--variation-${themeConfig.value.mainMenuLinks.variable}`]: !!themeConfig.value.mainMenuLinks.variable,
    ['mc-side-bar--black__button mc-button nuxt-link-active']:
      menuMainItem.menu && menuMainItem.menu.length && !menuMainItem.open && menuMainItem.active
  }
}

const handlerSidebarItemClick = () => {
  props.compact && emit('open-side-bar')
}

// заранее формируем меню один раз, так как компьютед излишен и во вторых нужна переменная "open" что бы ее тогглить
const setMainMenu = (): void => {
  preparedMainMenu.value = props.menuMain.map((i: ISideBarMenuItem) => {
    const child_active = i.menu && i.menu.some(im => im.active)

    return {
      id: randomNumber.timestamp(5),
      ...i,
      indicator: () => i.menu && i.menu.some((r) => !!props.counts?.[r.count_key] || !!r.info),
      open: props.compact ? false : i.active || child_active,
      active: i.active,
      child_active,
      classes: getMenuItemHeadClasses(i as ISideBarMenuItemEnrichment),
    } as ISideBarMenuItemEnrichment
  })
}

watch(
  () => props.menuMain,
  (): void => {
    setMainMenu()
  },
  { deep: true, immediate: true }
)
watch(
  () => props.compact,
  (): void => {
    setMainMenu()
  }
)
</script>

<template>
  <div class="mc-side-bar-center">
    <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">
      {{ title }}
    </mc-title>
    <!-- v-show hides jumping with child menu opening after locale switch  -->
    <div v-if="preparedMainMenu && preparedMainMenu.length" class="mc-side-bar-center__content">
      <div
        v-for="menuMainItem in preparedMainMenu"
        :key="menuMainItem.id"
        :class="{ 'item-active': menuMainItem.active }"
        class="mc-side-bar-center__content-item item"
      >
        <div class="item__head" :class="menuMainItem.classes" @click="handlerSidebarItemClick">
          <!-- TODO refactor info -->
          <mc-side-bar-button
            :info="
              !(menuMainItem.menu && !!menuMainItem.menu.length)
                ? menuMainItem.info || props.counts[menuMainItem.count_key] || null
                : null
            "
            :href="menuMainItem.href"
            :to="menuMainItem.to"
            :icon="menuMainItem.icon"
            :icon-color="menuMainItem.iconColor"
            :title="menuMainItem.name"
            :compact="compact"
            :is-active="menuMainItem.active"
            :with-submenu="menuMainItem.menu && !!menuMainItem.menu.length"
            :with-indicator="menuMainItem.indicator() && !menuMainItem.open"
            :variation="menuMainItem.child_active ? 'white-link' : 'gray-link'"
            with-tooltip
            class="item__head-button--no-hover"
          />
          <mc-button
            v-if="menuMainItem.menu && menuMainItem.menu.length && !compact"
            :variation="menuMainItem.active ? 'white-link' : 'gray-link'"
            :size="ButtonSize.MCompact"
            class="item__head-arrow"
            :class="{
              rotate: menuMainItem.active ? menuMainItem.active && menuMainItem.open : menuMainItem.open
            }"
            @click="menuMainItem.open = !menuMainItem.open"
          >
            <template #icon-prepend>
              <mc-svg-icon name="arrow_forward" />
            </template>
          </mc-button>
        </div>
        <mc-slide-up-down
          v-if="menuMainItem.menu && menuMainItem.menu.length"
          class="item__submenu"
          :active="menuMainItem.open"
        >
          <mc-side-bar-button
            v-for="(menuItem, i) in menuMainItem.menu"
            :key="i"
            :info="menuItem.info || counts[menuItem.count_key]"
            :href="menuItem.href"
            :to="menuItem.to"
            :icon="menuItem.icon"
            :icon-color="menuItem.iconColor"
            :title="menuItem.name"
            :compact="compact"
            :is-active="menuItem.active"
            with-tooltip
          />
        </mc-slide-up-down>
      </div>
    </div>
    <mc-separator
      v-if="chatraConfig.title"
      color="dark-gray"
      indent-top="150"
      indent-bottom="150"
      :indent-left="compact ? '50' : '100'"
      :indent-right="compact ? '50' : '100'"
    />
    <mc-side-bar-button
      v-if="chatraConfig.title"
      icon="chat_messages"
      :title="chatraConfig.title"
      :compact="compact"
      with-tooltip
      @click="emit('handlerChatraClick')"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/colors' as *;
.mc-side-bar-center {
  $block-name: &;
  margin-bottom: $space-150;
  &__title {
    margin: $space-100;
  }

  &__content {
    @include child-indent-bottom($space-50);
    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      @include child-indent-bottom($space-50);
      &-active {
        .item__head.active:not(.with-submenu),
        .nuxt-link-exact-active {
          pointer-events: none;
        }
      }
      .with-submenu {
        pointer-events: all !important;
        .item__head {
          &-button--no-hover {
            .mc-button {
              background: none;
            }
          }
        }
        .mc-side-bar-button {
          &__tooltip {
            width: calc(100% - #{$space-250});
            .mc-button {
              &__text {
                margin-inline-end: $space-zero;
              }
            }
          }
        }
      }
      &__head {
        display: flex;
        align-items: center;
        border-radius: 4px;

        .mc-button {
          &__background {
            display: none;
          }
        }
        &:hover {
          background-color: rgba($color-gray, 0.1);
        }
        &-arrow {
          &.rotate {
            .mc-svg-icon {
              transform: rotate(90deg);
            }
          }
          .mc-svg-icon {
            transition: all 0.3s ease;
          }
        }
        &-button {
          &--no-hover {
            .mc-button {
              &:hover {
                background-color: unset;
              }
            }
            .mc-side-bar-button__with-submenu {
              background-color: unset;
            }
            &:hover {
              background-color: unset;
            }
          }
        }
        &.active {
          padding: 0;
          border-radius: 4px;
          border: none;
          &.open {
            background-color: unset;
          }
        }
      }
      &__submenu {
        overflow: hidden;
        transition: all 0.3s ease;
        @include child-indent-bottom($space-50);
        .mc-side-bar-button {
          padding-inline-start: $space-500;
          height: 42px;
        }
        &.open {
          max-height: 230px;
        }
      }
    }
  }
}
</style>
