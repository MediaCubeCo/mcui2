<script setup lang="ts">
import { computed, defineAsyncComponent, inject, type PropType, ref, useSlots, watch } from 'vue'
import type {
  ISideBarChatra,
  ISideBarLink,
  ISideBarMenuItem,
  ISideBarMenuItemEnrichment,
  ISidebarThemeConfigProvide
} from '@/types/ISideBar'
import { ButtonSize } from '@/enums/ui/Button'
import { SidebarTheme } from '@/enums/Sidebar'
import { defaultThemes } from '@/mocks/sidebar'
const McTitle = defineAsyncComponent(() => import('@/components/elements/McTitle/McTitle.vue'))
const McSideBarButton = defineAsyncComponent(() => import('@/components/patterns/McSideBar/McSideBarButton/McSideBarButton.vue'))
const McSeparator = defineAsyncComponent(() => import('@/components/elements/McSeparator/McSeparator.vue'))
const McButton = defineAsyncComponent(() => import('@/components/elements/McButton/McButton.vue'))
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))
const McSlideUpDown = defineAsyncComponent(() => import('@/components/elements/McSlideUpDown/McSlideUpDown.vue'))

const provideData = inject<ISidebarThemeConfigProvide>('provideData', {} as ISidebarThemeConfigProvide)
const slots = useSlots()

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
const openMenuIds = ref<Record<string, boolean>>({})
const active_menu = ref<string | null>(null)

const themeConfig = computed(() => {
  return provideData.currentThemeConfig || defaultThemes[SidebarTheme.Black]
})

const hasContentAppend = computed(() => {
  return !!props.chatraConfig.title || slots['content-append']
})

const getMenuItemHeadClasses = (menuMainItem: ISideBarMenuItemEnrichment) => {
  return {
    open: openMenuIds.value[menuMainItem.id],
    active: isMenuItemActive(menuMainItem),
    'with-submenu': !!menuMainItem.menu?.length,
    [`mc-side-bar--${themeConfig.value.mode || 'black'}__button`]: true,
    'purple-hover': themeConfig.value.mainMenuLinks.variable === 'black-flat',
    [`mc-button--variation-${themeConfig.value.mainMenuLinks.variable}`]: !!themeConfig.value.mainMenuLinks.variable,
    ['mc-side-bar--black__button mc-button nuxt-link-active']:
      menuMainItem.menu?.length && !openMenuIds.value[menuMainItem.id] && isMenuItemActive(menuMainItem)
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

const setAllMenuIds = (): void => {
  for (const item of preparedMainMenu.value) {
    openMenuIds.value[item.id] = false
  }
}

// устанавливаем активный пункт меню который будет подсвечиваться
const handleSetActiveMenuItem = (menu_item: ISideBarMenuItemEnrichment) => {
  setAllMenuIds()
  active_menu.value = menu_item.id
}

// открыть подменю пункта меню
const handleMenuItemOpen = (menu_item: ISideBarMenuItemEnrichment) => {
  openMenuIds.value[menu_item.id] = true
}

// тоггл подменю пункта меню
const handleToggleMenuItemOpen = (menu_item: ISideBarMenuItemEnrichment): void => {
  const id = menu_item.id
  openMenuIds.value[id] = !openMenuIds.value[id]
}

const handleSetActive = (prepared_menu: ISideBarMenuItemEnrichment[]) => {
  for (const menu_item of prepared_menu) {
    if (menu_item.menu?.some(mim => mim.active)) {
      const active_item = menu_item.menu.find(mim => mim.active)
      handleSetActiveMenuItem(active_item as ISideBarMenuItemEnrichment)
      handleMenuItemOpen(menu_item as ISideBarMenuItemEnrichment)
      break
    }
    if (menu_item.active) {
      handleSetActiveMenuItem(menu_item as ISideBarMenuItemEnrichment)
      handleMenuItemOpen(menu_item as ISideBarMenuItemEnrichment)
      break
    }
  }
}

// небольшая подготовка меню
const getPreparedMainMenu = (): ISideBarMenuItemEnrichment[] => {
  return props.menuMain.map((i: ISideBarMenuItem) => {
    const id = i.id || getStableId(i)
    const indicator = () => i.menu && i.menu.some((r) => !!props.counts?.[r.count_key] || !!r.info)
    const menu = i.menu ? i.menu.map((im) => ({ ...im, id: im.id || getStableId(im, id) })) : []

    return { ...i, id, indicator, menu } as ISideBarMenuItemEnrichment
  })
}

// заранее формируем меню один раз
const setMainMenu = (): void => {
  preparedMainMenu.value = getPreparedMainMenu()
  setAllMenuIds()

}
setMainMenu()

watch(
  () => props.menuMain,
  () => {
    const prepared_menu = getPreparedMainMenu()
    handleSetActive(prepared_menu as ISideBarMenuItemEnrichment[])
  },
  { immediate: true, deep: true }
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
            :with-indicator="menuMainItem.indicator() && !openMenuIds[menuMainItem.id]"
            :variation="isChildActive(menuMainItem) ? 'white-link' : 'gray-link'"
            with-tooltip
            class="item__head-button--no-hover"
          />
          <mc-button
            v-if="menuMainItem.menu?.length && !props.compact"
            class="item__head-arrow"
            :variation="isMenuItemActive(menuMainItem) ? 'white-link' : 'gray-link'"
            :size="ButtonSize.MCompact"
            :class="{ rotate: openMenuIds[menuMainItem.id] }"
            @click="handleToggleMenuItemOpen(menuMainItem)"
          >
            <template #icon-prepend>
              <mc-svg-icon name="arrow_forward" />
            </template>
          </mc-button>
        </div>
        <mc-slide-up-down v-if="menuMainItem.menu?.length" class="item__submenu" :active="openMenuIds[menuMainItem.id] && !props.compact">
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

<style lang="scss" scoped src="./index.scss"></style>
