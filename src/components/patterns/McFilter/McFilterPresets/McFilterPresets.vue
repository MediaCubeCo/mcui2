<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue'
import type { ButtonVariationUnion } from '@/types/IButton'
import type { ColorTypes } from '@/types/styles/Colors'
import type { IFilterPreset } from '@/types/IFilter'
import { useLocalStorage, useDebounceFn } from '@vueuse/core'
import { useTheme } from '@/composables/useTheme'
import McWrapScroll from '@/components/patterns/McWrapScroll/McWrapScroll.vue'
import McGridCol from '@/components/patterns/McGridCol/McGridCol.vue'
const McButton = defineAsyncComponent(() => import('@/components/elements/McButton/McButton.vue'))

const emit = defineEmits(['preset-selected'])
const props = defineProps({
  name: {
    type: String as PropType<string>,
    required: true
  },
  selectedPreset: {
    type: Object as PropType<IFilterPreset>,
    default: null
  }
})
const theme = useTheme('filter')
const debounce = useDebounceFn((method) => {
  method()
}, 100)

const storage_name = 'mcFilterPresets'

const activePreset = ref<IFilterPreset | null>(null)
const filterLocalStorage = useLocalStorage<Record<string, IFilterPreset[]>>(storage_name, {})
const presets = ref<IFilterPreset[]>([])

const handlePresetMouseUp = (preset: IFilterPreset) => {
  if (activePreset.value && activePreset.value.name === preset.name) {
    activePreset.value = null
  } else {
    activePreset.value = preset
  }
  emit('preset-selected', activePreset.value)
}

const updatePresets = (): void => {
  presets.value = filterLocalStorage.value[props.name] || ([] as IFilterPreset[])
}

const getPresetButtonVariation = (preset: IFilterPreset): ButtonVariationUnion => {
  return activePreset.value && activePreset.value.name === preset.name
    ? (`${theme.component.button}-invert` as ColorTypes)
    : 'gray-outline'
}

const handleStorageChange = (e: StorageEvent) => {
  if (e?.key === storage_name) {
    debounce(() => {
      updatePresets()
    })
  }
}

onMounted(() => {
  updatePresets()
  window.addEventListener('storage', handleStorageChange)
})

onBeforeUnmount((): void => {
  window.removeEventListener('storage', handleStorageChange)
})
watch(
  () => props.selectedPreset,
  (val) => {
    activePreset.value = val
  }
)
</script>

<template>
  <div class="mc-filter-presets">
    <div class="mc-filter-presets-inner">
      <mc-wrap-scroll :scroll-speed="2" :gutter-x="8">
        <mc-grid-col v-for="preset in presets" :key="preset.name">
          <mc-button
            :variation="getPresetButtonVariation(preset)"
            :secondary-color="theme.component.button as ColorTypes"
            @mouseup="() => handlePresetMouseUp(preset)"
          >
            {{ preset.name }}
          </mc-button>
        </mc-grid-col>
      </mc-wrap-scroll>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
