<script setup lang="ts">
import { useDebounceFn, useDraggable, useLocalStorage, useSessionStorage } from '@vueuse/core'
import { computed, defineAsyncComponent, type PropType, ref, watch } from 'vue'
import { type ColorTypes } from '@/types/styles/Colors'
import type { ColorsUnion } from '@/types/styles/Colors'
import { useTheme } from '@/composables/useTheme'
const McPreview = defineAsyncComponent(() => import('@/components/patterns/McPreview/McPreview.vue'))

export interface DraggableInitPayload {
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

<style lang="scss" src="./index.scss"></style>
