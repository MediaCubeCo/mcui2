<script setup lang="ts">
import { computed, type PropType, ref, inject, onMounted, useAttrs } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { ITab } from '@/types/ITabs'
import type { IRoute } from '@/types/IRoute'
import { type IconsListUnion } from '@/types/styles/Icons'
import { useTheme } from '@/composables/useTheme'

const selfRegisterTabToMcTabs: Function = inject('selfRegisterTabMethod', () => {})
const attrs = useAttrs()
const props = defineProps({
  /**
   *  Если нужен иной фрагмент в url после #
   *  (по умолчанию берётся из 'name')
   */
  id: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Имя таба (unique)
   */
  name: {
    type: String as PropType<string>,
    required: true,
    default: ''
  },
  /**
   *  Вставка в начало имени таба
   *  (не влияет на значение вставленное в url)
   */
  prefix: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   *  Вставка в конец имени таба
   *  (не влияет на значение вставленное в url)
   */
  suffix: {
    type: String as PropType<string>,
    default: ''
  },
  appendCount: {
    type: Number as PropType<number>,
    default: null
  },
  appendCountColor: {
    type: String as () => ColorTypes,
  },
  /**
   *  Отключенное состояние
   */
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Виден ли таб
   */
  visible: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Классы иконки в начале
   */
  iconPrepend: {
    type: String as () => IconsListUnion,
    default: ''
  },
  /**
   *  Классы иконки в конце
   */
  iconAppend: {
    type: String as () => IconsListUnion,
    default: ''
  },
  /**
   *  Цвет иконки в начале
   */
  iconPrependColor: {
    type: String as () => ColorTypes,
    default: ''
  },
  /**
   *  Цвет иконки в конце
   */
  iconAppendColor: {
    type: String as () => ColorTypes,
    default: ''
  },
  /**
   *  Если нужна ссылка внутри приложения:
   * `{name: 'test', params: { id: test.id }}`
   */
  to: {
    type: Object as PropType<IRoute>,
    default: null
  },
  /**
   *  Если нужна обычная ссылка:
   * `https://mediacube.agency/`
   */
  href: {
    type: String as PropType<string>,
    default: ''
  }
})

const theme = useTheme('tab')

const isActive = ref<boolean>(false)
const isVisible = ref<boolean>(true)

const computedAppendCountColor = computed((): ColorTypes => {
  return props.appendCountColor || theme.component.count as ColorTypes
})

const computedId = computed((): string => {
  return props.id ? props.id : props.name.toLowerCase().replace(/ /g, '-')
})

const hash = computed((): string => {
  return props.isDisabled ? '#' : `#${computedId.value}`
})

const hasAppendCount = computed((): boolean => {
  return !!props.appendCount || props.appendCount === 0
})

const appendCountStyles = computed((): string => {
  return `--mc-tab-append-count-color: ${theme.colors[computedAppendCountColor.value]}`
})

const computedTabName = computed((): string => {
  return [props.prefix, props.name, props.suffix].filter(Boolean).join('')
})

const header = computed(() => {
  return props.visible ? computedTabName.value : ''
})

onMounted(() => {
  if (selfRegisterTabToMcTabs) {
    const payload: Partial<ITab> = {
      isActive: isActive.value,
      isVisible: isVisible.value,
      computedId: computedId.value,
      hash: hash.value,
      hasAppendCount: hasAppendCount.value,
      appendCountStyles: appendCountStyles.value,
      header: header.value,
      id: props.id,
      name: props.name,
      to: props.to,
      href: props.href,
      iconAppendColor: props.iconAppendColor,
      iconPrependColor: props.iconPrependColor,
      iconAppend: props.iconAppend,
      iconPrepend: props.iconPrepend,
      visible: props.visible,
      isDisabled: props.isDisabled,
      appendCountColor: computedAppendCountColor.value,
      appendCount: props.appendCount,
      suffix: props.suffix,
      prefix: props.prefix,
      showTab,
      hideTab,
      onClick: attrs.onClick,
      ...attrs
    }
    selfRegisterTabToMcTabs(payload)
  }
})

const showTab = () => {
  isActive.value = true
}
const hideTab = () => {
  isActive.value = false
}
</script>

<template>
  <section
    v-show="isActive"
    :id="id"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    role="tabpanel"
    :href="href"
    :to="to"
  >
    <!-- @slot контента -->
    <slot v-if="visible" />
  </section>
</template>

<style lang="scss">
@use '../../../assets/tokens/colors' as *;

.tabs-component-panel {
  $block-name: &;
}
.tabs-component-tab {
  --mc-tab-append-count-color: #{$color-black};
  &__tab {
    &-name-append-count {
      color: var(--mc-tab-append-count-color);
    }
  }
  a:empty {
    margin: 0;
    padding: 0;
  }
}
</style>
