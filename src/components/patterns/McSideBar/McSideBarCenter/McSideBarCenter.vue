<script setup lang="ts">
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McSideBarButton from '@/components/patterns/McSideBar/McSideBarButton/McSideBarButton.vue'
import McSeparator from '@/components/elements/McSeparator/McSeparator.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { computed, inject, type PropType, reactive, ref, useSlots, watch } from 'vue'
import type { ISideBarChatra, ISideBarLink, ISideBarMenuItem, ISideBarMenuItemEnrichment, ISidebarThemeConfigProvide } from '@/types/ISideBar'
import { ButtonSize } from '@/enums/ui/Button'
import { SidebarTheme } from '@/enums/Sidebar'
import McSlideUpDown from '@/components/elements/McSlideUpDown/McSlideUpDown.vue'
import { defaultThemes } from '@/mocks/sidebar'

const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const slots = useSlots()
const emit = defineEmits<{
  (e: 'open-side-bar'): void
  (e: 'handlerChatraClick'): void
  (e: 'item-selected', value: ISideBarMenuItemEnrichment): void
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
const opened_menus = reactive(new Set())
const active_menu = ref<string | null>(null)

const themeConfig = computed(() => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const hasContentAppend = computed(() => {
  return !!props.chatraConfig.title || slots['content-append']
})

const getMenuItemHeadClasses = (menuMainItem: ISideBarMenuItemEnrichment) => {
  return {
    open: isMenuItemOpen(menuMainItem),
    active: isMenuItemActive(menuMainItem),
    'with-submenu': !!menuMainItem.menu?.length,
    [`mc-side-bar--${themeConfig.value.mode || 'black'}__button`]: true,
    'purple-hover': themeConfig.value.mainMenuLinks.variable === 'black-flat',
    [`mc-button--variation-${themeConfig.value.mainMenuLinks.variable}`]: !!themeConfig.value.mainMenuLinks.variable,
    ['mc-side-bar--black__button mc-button nuxt-link-active']:
      menuMainItem.menu?.length && !isMenuItemOpen(menuMainItem) && isMenuItemActive(menuMainItem)
  }
}

// клик по основному пункту меню
const handlerSidebarItemClick = () => {
  props.compact && emit('open-side-bar')
}

// важно что бы id были уникальными! не править метод, или править очень аккуратно, на id много логики завязано
function getStableId(i: any, salt?: string): string {
  return [salt || i?.name, i?.to, i?.href, i?.icon].filter(Boolean).join(':')
}

// если у пункта меню есть подменю, есть ли там активные элементы
const isChildActive = (menu_item: ISideBarMenuItem | ISideBarMenuItemEnrichment): boolean => {
  if (!menu_item) return false
  return menu_item.menu ? menu_item.menu.some((mim) => active_menu.value === mim.id) : false
}

// активен ли пункт меню
const isMenuItemActive = (menu_item: ISideBarMenuItemEnrichment | ISideBarLink): boolean => {
  // @ts-ignore
  return active_menu.value === menu_item.id || isChildActive(menu_item)
}

// открыто ли подменб пункта меню
const isMenuItemOpen = (menu_item: ISideBarMenuItemEnrichment): boolean => {
  if (!menu_item) return false
  return props.compact ? false : opened_menus.has(menu_item.id)
}

// устанавливаем активный пункт меню который будет подсвечиваться
const handleSetActiveMenuItem = (menu_item: ISideBarMenuItemEnrichment) => {
  opened_menus.clear()
  if (active_menu.value && active_menu.value !== menu_item.id) emit('item-selected', menu_item)
  active_menu.value = menu_item.id
}

// открыть подменю пункта меню
const handleMenuItemOpen = (menu_item: ISideBarMenuItemEnrichment) => {
  !opened_menus.has(menu_item.id) && opened_menus.add(menu_item.id)
}

// тоггл подменю пункта меню
const handleToggleMenuItemOpen = (menu_item: ISideBarMenuItemEnrichment): void => {
  opened_menus.has(menu_item.id) ? opened_menus.delete(menu_item.id) : handleMenuItemOpen(menu_item)
}

// обработка клика по пункту в подменю
const handleSubItemClick = (sub_item: any, menu_item: ISideBarMenuItemEnrichment) => {
  handleSetActiveMenuItem(sub_item)
  handleMenuItemOpen(menu_item)
}

// обработка клика по пункту в меню
const handleItemClick = (menu_item: ISideBarMenuItemEnrichment) => {
  if (!menu_item.href) {
    if (menu_item.menu?.length) {
      const [target] = menu_item.menu
      return handleSubItemClick(target, menu_item)
    } else {
      handleSetActiveMenuItem(menu_item)
      handleMenuItemOpen(menu_item)
    }
  }
}

// установка актинвного пункта меню / подменю
const initialSetActiveMenuItem = (prepared_menu: ISideBarMenuItemEnrichment[]) => {
  for (const i of prepared_menu) {
    if (i.menu && i.menu.some((pim) => pim.active)) {
      const target = i.menu.find((pim) => pim.active)
      handleSubItemClick(target, i)
      continue
    }
    if (i.active) {
      handleSetActiveMenuItem(i)
      handleMenuItemOpen(i)
    }
  }
}

// небольшая подготовка меню
const getPreparedMainMenu = (): ISideBarMenuItemEnrichment[] => {
  return props.menuMain.map((i: ISideBarMenuItem) => {
    const id = getStableId(i)
    const indicator = () => i.menu && i.menu.some((r) => !!props.counts?.[r.count_key] || !!r.info)
    const menu = i.menu ? i.menu.map((im) => ({ ...im, id: im.id || getStableId(im, id) })) : []

    return { id: i.id || id, ...i, indicator, menu } as ISideBarMenuItemEnrichment
  })
}

// заранее формируем меню один раз
const setMainMenu = (): void => {
  const prepared_menu = getPreparedMainMenu()
  preparedMainMenu.value = prepared_menu
  initialSetActiveMenuItem(prepared_menu)
}

setMainMenu()

// следим за меню и обновляем только активное ссостояние, без переформирования меню, что бы избежать ререндеров
watch(
  () => props.menuMain,
  (): void => {
    const prepared_menu = getPreparedMainMenu()
    initialSetActiveMenuItem(prepared_menu)
  },
  { deep: true }
)
</script>

<template>
  <div class="mc-side-bar-center">
    <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">
      {{ title }}
    </mc-title>
    <div v-if="preparedMainMenu && preparedMainMenu.length" class="mc-side-bar-center__content">
      <div
        v-for="menuMainItem in preparedMainMenu"
        :key="menuMainItem.id"
        :class="{ 'item-active': isMenuItemActive(menuMainItem) }"
        class="mc-side-bar-center__content-item item"
      >
        <div class="item__head" :class="getMenuItemHeadClasses(menuMainItem)" @click="handlerSidebarItemClick()">
          <mc-side-bar-button
            :info="
              !menuMainItem.menu?.length ? menuMainItem.info || props.counts[menuMainItem.count_key] || null : null
            "
            :href="menuMainItem.href"
            :to="menuMainItem.to"
            :icon="menuMainItem.icon"
            :icon-color="menuMainItem.iconColor"
            :title="menuMainItem.name"
            :compact="compact"
            :is-active="isChildActive(menuMainItem) ? compact : isMenuItemActive(menuMainItem)"
            :with-submenu="!!menuMainItem.menu?.length"
            :with-indicator="menuMainItem.indicator() && !isMenuItemOpen(menuMainItem)"
            :variation="isChildActive(menuMainItem) ? 'white-link' : 'gray-link'"
            with-tooltip
            class="item__head-button--no-hover"
            @click.stop="handleItemClick(menuMainItem)"
          />
          <mc-button
            v-if="menuMainItem.menu?.length && !compact"
            class="item__head-arrow"
            :variation="isMenuItemActive(menuMainItem) ? 'white-link' : 'gray-link'"
            :size="ButtonSize.MCompact"
            :class="{ rotate: isMenuItemOpen(menuMainItem) }"
            @click="handleToggleMenuItemOpen(menuMainItem)"
          >
            <template #icon-prepend>
              <mc-svg-icon name="arrow_forward" />
            </template>
          </mc-button>
        </div>
        <mc-slide-up-down v-if="menuMainItem.menu?.length" class="item__submenu" :active="isMenuItemOpen(menuMainItem)">
          <mc-side-bar-button
            v-for="menuItem in menuMainItem.menu"
            :key="menuItem.id"
            :info="menuItem.info || counts[menuItem.count_key]"
            :href="menuItem.href"
            :to="menuItem.to"
            :icon="menuItem.icon"
            :icon-color="menuItem.iconColor"
            :title="menuItem.name"
            :compact="compact"
            :is-active="isMenuItemActive(menuItem)"
            with-tooltip
            @click.stop="handleSubItemClick(menuItem, menuMainItem)"
          />
        </mc-slide-up-down>
      </div>
    </div>
    <mc-separator
      v-if="hasContentAppend"
      color="dark-gray"
      indent-top="150"
      indent-bottom="150"
      :indent-left="compact ? '50' : '100'"
      :indent-right="compact ? '50' : '100'"
    />
    <div v-if="hasContentAppend" class="mc-side-bar-center__content-append">
      <slot name="content-append" :compact="compact" />
      <mc-side-bar-button
        v-if="chatraConfig.title"
        icon="chat_messages"
        :title="chatraConfig.title"
        :compact="compact"
        with-tooltip
        @click="emit('handlerChatraClick')"
      />
    </div>
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
        justify-content: flex-start;
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
    &-append {
      @include child-indent-bottom($space-50);
    }
  }
}
</style>
