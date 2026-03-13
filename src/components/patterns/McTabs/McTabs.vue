<script setup lang="ts">
import { computed, onMounted, onUpdated, type PropType, ref, watch, provide, nextTick, inject } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { ColorsUnion } from '@/types/styles/Colors'
import McWrapScroll from '@/components/patterns/McWrapScroll/McWrapScroll.vue'
import type { ITab } from '@/types/ITabs'
import { type TabVariationUnion } from '@/types/ITabs'
import { TabVariations } from '@/enums/Tab'
import McChip from '@/components/elements/McChip/McChip.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { IDSOptions } from '@/types/IDSOptions'
import { useTheme } from '@/composables/useTheme'
import { ChipSize } from '@/enums/Chip'
import { useDebounceFn } from '@vueuse/core'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'tab-changed', value: { tab: ITab; event?: Event }): void
  (e: 'clicked', value: { tab: ITab }): void
}>()

const dsOptions = inject<IDSOptions>('dsOptions', {})

const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    default: null
  },
  /**
   *  Размеры табов:
   *  `body, caption, overline`
   */
  tabVariation: {
    type: String as PropType<TabVariationUnion>,
    default: TabVariations.Captions
  },
  /**
   *  Цвет текста табов
   */
  color: {
    type: String as () => ColorTypes
  },
  /**
   *  Цвет линии активного таба
   */
  accentColor: {
    type: String as () => ColorTypes
  },
  /**
   *  Заглавные буквы
   *  табов
   */
  uppercase: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Передаваемое состояние загрузки
   *
   * Нужно для метода switchingDisableTab
   * в случае, если состояние табов (active/disable)
   * задается динамически
   */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Закрепленные табы
   *
   * Добавляет верхнее расстояние
   * для табов для правильного отображения
   */
  sticky: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const theme = useTheme('tabs')
const tabs = ref<ITab[]>([])

const computedColor = computed((): ColorsUnion => {
  return props.color || (theme.component.color as ColorTypes)
})
const computedAccentColor = computed((): ColorsUnion => {
  return props.accentColor || (theme.component.accentColor as ColorTypes)
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-tabs': true,
    [`mc-tabs--tab-variation-${props.tabVariation}`]: !!props.tabVariation,
    'mc-tabs--uppercase': !!props.uppercase,
    'mc-tabs--sticky': !!props.sticky
  }
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-tabs-color': theme.colors[computedColor.value as ColorTypes],
    '--mc-tabs-accent-color': theme.colors[computedAccentColor.value as ColorTypes]
  }
})

const computedValue = computed<{ get: () => string | null; set: (val: string) => void }>({
  // @ts-ignore
  get(): string | null {
    return props.modelValue
  },
  set(value: string): void {
    emit('update:modelValue', value)
  }
})
const activeVisibleTabs = computed((): ITab[] => {
  return tabs.value.filter((tab) => tab.visible && !tab.isDisabled)
})

const updateTabsState = (payload: string): void => {
  tabs.value.forEach((tab: ITab) => {
    tab.isActive = tab.computedId === payload
    tab.isActive ? tab.showTab() : tab.hideTab()
  })
}

const selfRegisterTabMethod = (payload: ITab): void => {
  tabs.value.push(payload)
}

const handleCheckInitTab = (): void => {
  let [tab]: ITab[] = activeVisibleTabs.value
  const preselectedTab: ITab | undefined = tabs.value.find((tab: ITab) => tab.computedId === props.modelValue)
  if (preselectedTab && !preselectedTab.isDisabled) {
    tab = preselectedTab
  }
  if (!tab) return

  handleSelectTab(tab)
}

const handleEmitChange = (tab: ITab, event?: Event): void => {
  emit('tab-changed', { tab, event } as { tab: ITab; event?: Event })
}

const watchDisableTab = useDebounceFn((): void => {
  if (props.loading) return
  const activeTab: ITab | undefined = tabs.value?.find((tab) => tab.isActive)
  if (!activeTab?.isDisabled) return
  const [tab]: ITab[] = activeVisibleTabs.value
  handleSelectTab(tab)
}, 100)

const handleSelectTab = (tab: ITab, event?: Event): void | undefined => {
  //@ts-ignore
  if ((tab.to || tab.href) && (event?.metaKey || event?.ctrlKey)) return

  event?.preventDefault()
  if (tab.isDisabled) return
  if (tab.onClick && typeof tab.onClick === 'function') return tab.onClick(tab, event)
  if (tab.href) {
    window.open(tab.href, '_blank')
    return
  }
  if (tab.to && dsOptions?.meta?.router) {
    dsOptions.meta.router.push(tab.to)
    return
  }
  handleEmitChange(tab, event)
  updateTabsState(tab.computedId)
  //@ts-ignore
  computedValue.value = tab.computedId
}

onMounted(handleCheckInitTab)
onUpdated(watchDisableTab)

watch(
  () => props.loading,
  (val, oldVal): void => {
    if (!val && oldVal)
      nextTick(() => {
        handleCheckInitTab()
      })
  }
)
provide('selfRegisterTabMethod', selfRegisterTabMethod)
</script>

<template>
  <div :class="classes" :style="styles">
    <div class="tabs-component">
      <mc-wrap-scroll tag-name="ul" role="tablist" scrollable class="tabs-component-tabs">
        <li
          v-for="(tab, i) in tabs"
          v-show="tab.isVisible"
          :key="i"
          :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled, 'is-hidden': !tab.visible }"
          class="tabs-component-tab"
          role="presentation"
        >
          <a
            :aria-controls="tab.hash"
            :aria-selected="tab.isActive"
            :href="tab.href || tab.to || tab.hash || 'javascript:void(0)'"
            class="tabs-component-tab-a"
            role="tab"
            @click="(e) => handleSelectTab(tab, e)"
          >
            <span class="tabs-component-tab__tab-name">
              <mc-svg-icon v-if="tab.iconPrepend" :name="tab.iconPrepend" :color="tab.iconPrependColor" size="200" />
              <span>{{ tab.header }}</span>
              <mc-svg-icon v-if="tab.iconAppend" :name="tab.iconAppend" :color="tab.iconAppendColor" size="200" />
              <mc-chip
                v-if="tab.hasAppendCount"
                :title="tab.appendCount"
                :text-color="tab.appendCountColor as ColorTypes"
                :size="ChipSize.S"
                class="tabs-component-tab__tab-name_append-count"
              />
            </span>
          </a>
        </li>
      </mc-wrap-scroll>
      <div class="tabs-component-panels">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
