<script setup lang="ts">
import { McButton } from '@/components'
import { onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue'
import type { ButtonVariationUnion, ColorTypes, IFilterPreset } from '@/types'
import { useLocalStorage, useDebounceFn } from '@vueuse/core'
import { useTheme } from '@/composables'

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

const handleStorageChange = (e:StorageEvent) => {
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
      <mc-button
        v-for="preset in presets"
        :key="preset.name"
        :variation="getPresetButtonVariation(preset)"
        :secondary-color="theme.component.button as ColorTypes"
        @mouseup="() => handlePresetMouseUp(preset)"
      >
        {{ preset.name }}
      </mc-button>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/spacings' as *;
.mc-filter-presets {
  $block-name: &;
  position: relative;
  flex-grow: 1;
  min-width: 0;
  &::after {
    @include pseudo();
    @include position(null, 0 0 0 null);
    width: $size-1000;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, $color-white);
    pointer-events: none;
  }

  &-inner {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: calc(#{$space-500} + 2px);
    @include child-indent-right($space-100);
    & {
      @include hide-scrollbar();
    }
    &::after {
      @include pseudo(block, static);
      min-width: $space-300;
    }
  }
}
</style>
