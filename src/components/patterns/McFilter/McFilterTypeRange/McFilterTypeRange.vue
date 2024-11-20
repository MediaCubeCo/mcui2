<script setup lang="ts">
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import type {
  IFilterCondition,
  IFilterPlaceholders,
  IFilterRangeValue,
  IRangeFilter
} from '@/types/IFilter.js'
import { computed, type PropType, ref, watch } from 'vue'
import { InputTypes } from '@/enums'

const emit = defineEmits<{
  (e: 'update:modelValue', value: IFilterCondition): void
}>()
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: Object as PropType<IFilterRangeValue>,
    default: () => ({
      more: null,
      less: null
    })
  },
  /**
   *  Объект выбранного
   *  фильтра
   */
  filter: {
    type: Object as PropType<IRangeFilter>,
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

const currentMore = ref<string | number | null>(null)
const currentLess = ref<string | number | null>(null)

const more = computed<string | number | null>({
  get() {
    return props.modelValue?.more
  },
  set(val) {
    currentMore.value = val || null
    emitValue()
  }
})

const less = computed<string | number | null>({
  get() {
    return props.modelValue?.less
  },
  set(val) {
    currentLess.value = val || null
    emitValue()
  }
})

watch(
  () => props.modelValue,
  (val: IFilterRangeValue): void => {
    if (val) {
      currentMore.value = props.modelValue.more || null
      currentLess.value = props.modelValue.less || null
    }
  },
  { deep: true }
)

const hasValue = (val: string | number | null) => {
  return val || Number.isInteger(val)
}

const emitValue = () => {
  const hasMore = hasValue(currentMore.value)
  const hasLess = hasValue(currentLess.value)
  const hasMin = props.filter.min && hasValue(props.filter.min)
  const hasMax = props.filter.max && hasValue(props.filter.max)

  let more = hasMore ? Number(currentMore.value) : null
  let less = hasLess ? Number(currentLess.value) : null

  if (props.filter.min && more && more < props.filter.min && hasMin) {
    more = props.filter.min
  }
  if (props.filter.max && less && less > props.filter.max && hasMax) {
    less = props.filter.max
  }
  if (props.filter.max && more && more > props.filter.max && hasMax) {
    more = props.filter.max
  }
  if (props.filter.min && less && less < props.filter.min && hasMin) {
    less = props.filter.min
  }
  const result: IFilterRangeValue = {
    more: more || null,
    less: less || null
  }
  currentLess.value = less
  currentMore.value = more

  /**
   * Событие по изменению интервала
   */
  emit('update:modelValue', { value: result })
}
</script>

<template>
  <div class="mc-filter-type-range">
    <mc-field-text
      v-model="more"
      :placeholder="placeholders.from.toLowerCase()"
      :type="InputTypes.AmountFormat"
      name="range_more"
    />
    <mc-field-text
      v-model="less"
      :placeholder="placeholders.to.toLowerCase()"
      :type="InputTypes.AmountFormat"
      name="range_less"
    />
  </div>
</template>

<style lang="scss">
@import '../../../../assets/styles/mixins';
@import '../../../../assets/tokens/spacings';
.mc-filter-type-range {
  $block-name: &;
  display: flex;
  @include child-indent-right($space-100);
  .mc-field-text {
    width: 146px;
  }
}
</style>
