<script setup lang="ts">
import { computed, onMounted, onUpdated, type PropType, ref, watch, provide, nextTick, inject } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { ColorsUnion } from '@/types/styles/Colors'
import McWrapScroll from '@/components/patterns/McWrapScroll/McWrapScroll.vue'
import type { ITab } from '@/types/ITabs'
import { type TabVariationUnion } from '@/types/ITabs'
import { TabVariations } from '@/enums/Tab'
import { McChip, McSvgIcon } from '@/components'
import { IDSOptions } from '@/types'
import { useTheme } from '@/composables/useTheme'
import { ChipSize } from '@/enums'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'tab-changed', value: { tab: ITab }): void
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
    type: String as () => ColorTypes,
  },
  /**
   *  Цвет линии активного таба
   */
  accentColor: {
    type: String as () => ColorTypes,
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
  return props.color || theme.component.color as ColorTypes
})
const computedAccentColor = computed((): ColorsUnion => {
  return props.accentColor || theme.component.accentColor as ColorTypes
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

onMounted(() => {
  handleCheckInitTab()
})
onUpdated(() => {
  setTimeout(() => {
    watchDisableTab()
  }, 10)
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

const handleEmitChange = (tab: ITab): void => {
  emit('tab-changed', { tab } as { tab: ITab })
}

const watchDisableTab = (): void => {
  if (props.loading) return
  const activeTab: ITab | undefined = tabs.value?.find((tab) => tab.isActive)
  if (!activeTab?.isDisabled) return
  const [tab]: ITab[] = activeVisibleTabs.value
  handleSelectTab(tab)
}

const handleSelectTab = (tab: ITab, event?: Event): void | undefined => {
  event?.preventDefault()
  if (tab.isDisabled) return
  if (tab.onClick && typeof tab.onClick === 'function') return tab.onClick(tab)
  if (tab.href) {
    window.open(tab.href, '_blank')
    return
  }
  if (tab.to && dsOptions?.meta?.router) {
    dsOptions.meta.router.push(tab.to)
    return
  }
  handleEmitChange(tab)
  updateTabsState(tab.computedId)
  //@ts-ignore
  computedValue.value = tab.computedId
}

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
          :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled }"
          class="tabs-component-tab"
          role="presentation"
        >
          <a
            :aria-controls="tab.hash"
            :aria-selected="tab.isActive"
            :href="tab.href || tab.hash || 'javascript:void(0)'"
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

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/z-indexes' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/spacings' as *;
.mc-tabs {
  $block-name: &;
  @mixin border() {
    &::before {
      @include pseudo();
      @include position(absolute, auto 0 0 0);
      height: 1px;
      background-color: $color-hover-gray;
    }
  }

  &--tab-variation {
    &-body {
      .tabs-component-tab-a {
        font-size: $font-size-300;
        line-height: $line-height-250;
      }
    }
    &-caption {
      .tabs-component-tab-a {
        font-size: $font-size-200;
        line-height: $line-height-200;
      }
    }
    &-overline {
      .tabs-component-tab-a {
        font-size: $font-size-100;
        line-height: $line-height-150;
        font-weight: $font-weight-medium;
      }
    }
  }
  .tabs-component-tab-a {
    color: var(--mc-tabs-color);
  }

  .tabs-component-tab-a {
    &::after {
      background-color: var(--mc-tabs-accent-color);
    }
    &:hover {
      color: var(--mc-tabs-accent-color);
    }
  }
  .tabs-component-tab.is-active {
    .tabs-component-tab-a {
      color: var(--mc-tabs-accent-color);
      font-weight: $font-weight-semi-bold;
    }
  }

  &--uppercase {
    .tabs-component-tabs {
      text-transform: uppercase;
    }
  }

  &--sticky {
    overflow: scroll;

    .tabs-component-tabs {
      position: sticky !important;
      top: 0;
      z-index: $z-index-sticky;
      background-color: $color-white;
    }
  }

  .tabs-component-tabs {
    @include reset-text-indents();
    position: relative;
    padding-left: 0;
    margin-top: 0;
    list-style-type: none;
    height: $space-350;
    @include border();
  }

  .tabs-component-tab {
    position: relative;
    flex: 0 0 auto;
    &:first-child {
      .tabs-component-tab-a {
        margin-left: 0;
      }
    }
    &:last-child {
      .tabs-component-tab-a {
        margin-right: 0;
      }
    }

    &.is-active {
      .tabs-component-tab-a {
        &::after {
          left: 0;
          right: 0;
          opacity: 1;
        }
      }
    }
    &.is-disabled {
      .tabs-component-tab-a {
        cursor: not-allowed;
        color: $color-outline-gray;
      }
    }

    &__tab-name {
      display: flex;
      align-items: center;
      @include child-indent-right($space-50);
      &::after {
        display: block;
        content: attr(data-name);
        font-weight: $font-weight-semi-bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
      &_append-count {
        padding: 0;
        height: auto;
        &::before {
          display: none;
        }
      }
    }
    &__icon {
      &-prepend {
        //color: var(--mc-tab-icon-prepend-color);
      }
      &-append {
        //color: var(--mc-tab-icon-append-color);
      }
    }
  }

  .tabs-component-tab-a {
    position: relative;
    display: inline-flex;
    font-family: $font-family-main;
    text-decoration: none;
    padding-bottom: $space-150;
    margin: 0 $space-150;
    cursor: pointer;

    @include child-indent-right($space-50);
    @include border();
    .las,
    .la {
      display: flex;
      align-items: center;
    }

    &::after {
      @include pseudo();
      @include position(null, null 50% 0 50%);
      opacity: 0;
      height: 2px;
      z-index: 1;
      transition:
        left 0.2s ease,
        right 0.2s ease,
        opacity 0.2s ease,
        color 0.2s ease;
    }
  }
}
</style>
