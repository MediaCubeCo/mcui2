<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, type PropType, ref, watch } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { McDropdownPanel } from '@/components'
import type { DropdownListPositionsUnion, DropdownPositionsUnion } from '@/types/IDropdown'
import { DropdownListPositions, DropdownPositions } from '@/enums/Dropdown'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types'

const throttle = useThrottleFn((method) => {
  method()
}, 200)

const id = 'dropdown-element-id'
const localList_position = ref<string | null>(null)
const local_position = ref<string | null>(null)
const dropdown_body = ref<HTMLElement | null>(null)
const activator = ref<HTMLElement | null>(null)
const is_open = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', value: any): void
}>()

const props = defineProps({
  /**
   * Состояние видимости контента
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  /**
   * Выравнивание
   * контента: 'left', 'right', 'auto'
   */
  position: {
    type: String as () => DropdownPositionsUnion,
    default: DropdownPositions.Left
  },
  /**
   * Направление отображения
   * контента: 'top', 'bottom', 'auto'
   */
  listPosition: {
    type: String as () => DropdownListPositionsUnion,
    default: DropdownListPositions.Bottom
  },
  /**
   * Минимальная ширина выпадаюзего списка
   */
  listMinWidth: {
    type: String as PropType<string>,
    default: 'inherit'
  },
  /**
   * Минимальная ширина выпадаюзего списка
   */
  listMaxHeight: {
    type: Number as PropType<number>,
    default: 300
  },
  hideOnSelect: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})

const theme = useTheme('dropdown')

const dropdownClasses = computed((): { [key: string]: boolean } => {
  return {
    [`mc-dropdown--position-${local_position.value}`]: !!local_position.value,
    [`mc-dropdown--list-position-${localList_position.value}`]: !!localList_position.value,
    ['mc-dropdown--is-open']: is_open.value
  }
})

const dropdownStyles = computed((): { [key: string]: string | number } => {
  return {
    '--dropdown-body-min-width': props.listMinWidth,
    '--dropdown-item-color': theme.component.itemColor as ColorTypes,
  }
})

onMounted((): void => {
  window.addEventListener('resize', throttledCalculateDropdownPosition)
  window.addEventListener('transitionrun', throttledCalculateDropdownPosition)
})

onBeforeUnmount((): void => {
  window.removeEventListener('resize', throttledCalculateDropdownPosition)
  window.removeEventListener('transitionrun', throttledCalculateDropdownPosition)
})

const toggleDropdown = (): void => {
  setOpenState(!is_open.value)
}

const handleClickOutside = (e: Event): void => {
  const target = e.target as HTMLElement
  if (is_open.value && !target.closest(`#${id}`)) closeDropdown()
}

const closeDropdown = (): void => {
  setOpenState(false)
}

const setOpenState = (payload: boolean): void => {
  is_open.value = payload
  emit('update:modelValue', payload)

  if (is_open.value) document.addEventListener('click', handleClickOutside)
  else document.removeEventListener('click', handleClickOutside)
}

const handleItemClick = (payload: any): void => {
  emit('select', payload)
  if (props.hideOnSelect) closeDropdown()
}

const calculateDropdownPosition = (): void => {
  if (!dropdown_body.value) return
  const rect = activator.value?.getBoundingClientRect()
  if (!rect) return
  const space_below: number = window.innerHeight - rect.bottom
  const space_left: number = window.innerWidth - rect.left
  const { offsetHeight: dropdown_height, offsetWidth: dropdown_width } = dropdown_body.value
  // Определяем направление отображения списка
  const auto_list_position: string =
    space_below < dropdown_height ? DropdownListPositions.Top : DropdownListPositions.Bottom
  const auto_position: string = space_left > dropdown_width ? DropdownPositions.Left : DropdownPositions.Right
  // Устанавливаем значения в зависимости от position
  localList_position.value = props.listPosition === DropdownListPositions.Auto ? auto_list_position : props.listPosition
  local_position.value = props.position === DropdownPositions.Auto ? auto_position : props.position
}

const throttledCalculateDropdownPosition = () => throttle(() => calculateDropdownPosition())

watch(
  () => props.modelValue,
  (val: boolean): void => {
    if (is_open.value !== val) setOpenState(val)

    nextTick((): void => {
      calculateDropdownPosition()
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="mc-dropdown" :id="id" :class="dropdownClasses" :style="dropdownStyles">
    <div
      class="mc-dropdown__toggle"
      ref="activator"
      tabindex="0"
      @keyup.esc="closeDropdown"
      @click.prevent.stop="toggleDropdown"
    >
      <!-- @slot активатора переключения состояния -->
      <slot name="activator" />
    </div>
    <div ref="dropdown_body" class="mc-dropdown__body">
      <!-- @slot контента -->
      <mc-dropdown-panel :max-height="listMaxHeight">
        <slot>
          <div
            v-for="(item, index) in items"
            :key="`dropdown-list-item-${item.id || item.key || index}`"
            class="mc-dropdown-panel__item"
            @click="handleItemClick(item)"
          >
            <slot name="item" :item="item"></slot>
          </div>
        </slot>
      </mc-dropdown-panel>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/z-indexes' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/spacings' as *;
.mc-dropdown {
  $block-name: &;
  --dropdown-body-min-width: inherit;

  position: relative;
  display: inline-block;

  &__toggle {
    outline: none;
    @include reset-text-indents();
    .mc-svg-icon {
      transition: all $duration-s;
    }
  }

  &__body {
    @include position(absolute, null null null 0);
    z-index: $z-index-dropdown;
    height: 0;
    overflow: hidden;
    margin: 0;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    min-width: var(--dropdown-body-min-width);
    transition:
      opacity $duration-s,
      transform $duration-s;

    .mc-button {
      &:not(.nuxt-link-active):not(.mc-button--is-active):not(.mc-button--variation-red-flat) {
        &:hover {
          background-color: color-mix(in srgb, var(--dropdown-item-color), white 90%);
          .mc-button__background {
            opacity: 0 !important;
          }
        }
      }
    }
  }

  &--list-position-top {
    #{$block-name} {
      &__body {
        bottom: 100%;
        margin-bottom: $space-100;
      }
    }
  }

  &--list-position-bottom {
    #{$block-name} {
      &__body {
        top: 100%;
        margin-top: $space-100;
      }
    }
  }

  &--is-open {
    #{$block-name} {
      &__body {
        height: auto;
        visibility: visible;
        overflow: visible;
        opacity: 1;
      }
    }

    #{$block-name} {
      &__toggle--rotate-icon {
        .rotate {
          position: relative;
          transform: rotate(180deg);
        }
      }
    }
  }

  &--position-right {
    #{$block-name} {
      &__body {
        inset-inline-start: auto;
        inset-inline-end: 0;
      }
    }
  }

  &--position-left {
    #{$block-name} {
      &__body {
        inset-inline-start: 0;
        inset-inline-end: auto;
      }
    }
  }
  .mc-dropdown-panel {
    &__item {
      & > * {
        width: 100%;
      }
    }
  }
}
</style>
