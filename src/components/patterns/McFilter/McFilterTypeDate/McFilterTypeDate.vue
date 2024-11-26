<script setup lang="ts">
import McDatepicker from '@/components/elements/McDatepicker/McDatepicker.vue'
import { computed, type PropType } from 'vue'
import type { IBaseFilter, IFilterCondition, IFilterDateValue } from '@/types/IFilter'

const emit = defineEmits<{
  (e: 'update:modelValue', value: IFilterCondition): void
}>()
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: Object as PropType<IFilterDateValue>,
    default: () => ({}) as IFilterDateValue
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
    type: Object,
    required: true
  },
  useTimezone: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})

const period = computed({
  get() {
    return props.modelValue ? [props.modelValue.more, props.modelValue.less] : []
  },
  set(val) {
    const period: IFilterDateValue = { more: val?.[0], less: val?.[1] }
    /**
     * Событие по изменению периода
     */
    emit('update:modelValue', { value: period })
  }
})
</script>

<template>
  <mc-datepicker
    v-model="period"
    :placeholders="placeholders.calendar"
    :placeholder="filter.placeholder || placeholders.choose"
    :use-timezone="props.useTimezone"
    name="condition_dates"
    class="mc-filter-type-date"
    range
  />
</template>

<style lang="scss">
.mc-filter-type-date {
  $block-name: &;
  width: 300px;
}
</style>
