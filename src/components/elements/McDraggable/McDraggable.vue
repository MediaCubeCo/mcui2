<script setup lang="ts">
import { useDebounceFn, useDraggable, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { computed, type PropType, ref, watch } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import { McPreview } from '@/components'
import type { ColorsUnion } from '@/types/styles/Colors'
import { useTheme } from '@/composables/useTheme'

interface DraggableInitPayload {
  x: number
  y: number
}

type CardIdType = string | number | undefined
type StorageTypeUnion = 'local' | 'session'

const theme = useTheme('draggable')
const localStorage = useLocalStorage('McDraggable', {})
const sessionStorage = useSessionStorage('McDraggable', {})
const draggable_el = ref<HTMLElement | null>(null)
const debounce = useDebounceFn((method) => {
  method()
}, 100)

const props = defineProps({
  /**
   * Дизайн:
   * purple, red, orange и т.д.
   */
  variation: {
    type: String as () => ColorTypes,
  },
  initial: {
    type: Object as PropType<DraggableInitPayload>,
    default: () =>
      ({
        x: 0,
        y: 0
      }) as DraggableInitPayload
  },
  /**
   * Key for save position to storage (**required**, if savePosition = true)
   * */
  cardId: {
    type: [String, Number] as PropType<CardIdType>
  },
  savePosition: {
    type: Boolean,
    default: false
  },
  storageType: {
    type: String as PropType<StorageTypeUnion>,
    default: 'session'
  }
})

const computedVariation = computed((): ColorTypes => {
  return props.variation || theme.component.variation as ColorTypes
})

const uniqueId = computed((): CardIdType => {
  return props.cardId
})

const isSessionStorageType = computed((): boolean => {
  return props.storageType === ('session' as StorageTypeUnion)
})
const isLocalStorageType = computed((): boolean => {
  return props.storageType === ('local' as StorageTypeUnion)
})
const initialPositions = computed((): DraggableInitPayload => {
  let local_x = props.initial.x || 0
  let local_y = props.initial.y || 0

  if (props.savePosition && !uniqueId.value)
    console.warn('cardId prop required, if savePosition = true')

  if (!uniqueId.value || !props.savePosition) return { x: local_x, y: local_y }
  if (isSessionStorageType.value) {
    //@ts-ignore
    const { x, y } = sessionStorage.value[uniqueId.value] || ({} as DraggableInitPayload)
    local_x = x
    local_y = y
  }
  if (isLocalStorageType.value) {
    //@ts-ignore
    const { x, y } = localStorage.value[uniqueId.value] || ({} as DraggableInitPayload)
    local_x = x
    local_y = y
  }
  return { x: local_x || 0, y: local_y || 0 } as DraggableInitPayload
})

const { x, y, style } = useDraggable(draggable_el, {
  initialValue: { x: initialPositions.value.x, y: initialPositions.value.y } as DraggableInitPayload
})

const styles = computed((): { [key: string]: ColorsUnion | string } => {
  return {
    '--mc-draggable-color': theme.colors[computedVariation.value]
  }
})

const handleSavePosition = (): void => {
  if (!uniqueId.value) return
  if (isSessionStorageType.value) {
    sessionStorage.value = {
      ...sessionStorage.value,
      [uniqueId.value]: { x: x.value, y: y.value }
    }
  }
  if (isLocalStorageType.value) {
    localStorage.value = {
      ...localStorage.value,
      [uniqueId.value]: { x: x.value, y: y.value }
    }
  }
}

watch(
  () => style.value,
  () => {
    if (!props.savePosition) return
    debounce(handleSavePosition)
  }
)
</script>

<template>
  <div ref="draggable_el" class="mc-draggable" :style="style">
    <div class="mc-draggable__inner" :style="styles">
      <mc-preview>
        <template #left>
          <slot name="left" />
        </template>
        <template #top>
          <slot name="top" />
        </template>
        <template #bottom>
          <slot name="bottom" />
        </template>
        <template #right>
          <slot name="right" />
        </template>
      </mc-preview>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/media-queries' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/z-indexes' as *;
.mc-draggable {
  position: fixed;
  z-index: $z-index-sticky;
  cursor: move;
  font-family: $font-family-main;
  &__inner {
    --mc-draggable-color: #{$color-purple};

    padding: $space-100 $space-150 $space-100 $space-200;
    min-height: $size-700;
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    user-select: none;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--mc-draggable-color);
      border-radius: $radius-200;
    }

    .mc-preview {
      width: 100%;
      z-index: 1;
      &__top {
        margin-bottom: $space-50;
      }
      &__left {
        display: flex;
        align-items: center;
        margin-inline-end: $size-150;
      }
      &__right {
        display: flex;
        align-items: center;
        margin-inline-start: auto;
        padding-inline-start: $space-100;
      }
    }

    @media #{$media-query-m-down} {
      .mc-preview {
        flex-wrap: wrap;

        &__center {
          flex: 1;
        }
        &__right {
          width: 100%;
          padding-top: $space-100;
          padding-inline-start: $size-400 - 2;
        }
      }
    }
  }
}
</style>
