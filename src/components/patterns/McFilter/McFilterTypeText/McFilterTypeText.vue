<script setup lang="ts">
import { McFieldText } from '@/components'
import { computed, type PropType } from 'vue'
import type { FilterTextValue, IBaseFilter, IFilterCondition, IFilterPlaceholders } from '@/types'

const emit = defineEmits<{
  (e: 'update:modelValue', value: IFilterCondition): void
}>()
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: [String, Number] as PropType<FilterTextValue>,
    default: null
  },
  /**
   *  Объект выбранного
   *  фильтра
   */
  filter: {
    type: Object as PropType<IBaseFilter>,
    default: () => ({})
  },
  /**
   *  Переводы локализаций
   */
  placeholders: {
    type: Object as PropType<IFilterPlaceholders>,
    required: true
  }
})

const text = computed({
  get(): FilterTextValue {
    return props.modelValue
  },
  set(val: FilterTextValue) {
    /**
     * Событие по изменению значения
     */
    emit('update:modelValue', { value: val })
  }
})
</script>

<template>
  <mc-field-text
    v-model="text"
    :placeholder="filter.placeholder || placeholders.enter"
    class="mc-filter-type-text"
    name="mc_filter_type_text"
  />
</template>

<style lang="scss">
.mc-filter-type-text {
  $block-name: &;
  width: 300px;
}
</style>
