<script setup lang="ts">
import { McButton, McTitle, McFieldSelect, McFieldText } from '@/components'
import { computed, type PropType, ref, watch, nextTick } from 'vue'
import {
  IFilterPlaceholders,
  FilterRelationValue,
  IRelationFilter,
  FilterOption,
  IFilterParsedValueFilter,
  FilterConditionValue,
  FilterRelationName,
  IFilterCondition, ColorTypes
} from '@/types'
import { FilterRelations } from '@/enums'
import { useHelper } from '@/composables'
import { useDebounceFn } from '@vueuse/core'
import { useTheme } from '@/composables/useTheme'

const helper = useHelper()
const emit = defineEmits<{
  (e: 'update:modelValue', value: IFilterCondition): void
}>()
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: Object as PropType<FilterRelationValue>,
    default: () => ({})
  },
  /**
   *  Объект выбранного
   *  фильтра
   */
  filter: {
    type: Object as PropType<IRelationFilter>,
    default: () => ({})
  },
  /**
   *  Переводы локализаций
   */
  placeholders: {
    type: Object as PropType<IFilterPlaceholders>,
    required: true
  },
  /**
   *  Текущее значение
   *  добавленных фильтров
   */
  currentValues: {
    type: Object as PropType<IFilterParsedValueFilter>,
    default: () => ({})
  }
})

const theme = useTheme('filter')

const debounce = useDebounceFn((method) => {
  method()
}, 100)
const relations = ref<FilterRelations[]>(Object.values(FilterRelations))
const relationType = ref<FilterRelations>(FilterRelations.Is)
const ajaxOptions = ref<FilterOption[]>([])
const loading = ref<boolean>(false)

const component = computed(() => {
  return props.filter.is_text ? McFieldText : McFieldSelect
})

const computedPlaceholder = computed(() => {
  return props.filter.placeholder || props.filter.is_text ? props.placeholders.enter : props.placeholders.choose
})

const isAjax = computed((): boolean => {
  return props.filter.getAjaxOptions?.constructor === Function
})

const computedOptions = computed(() => {
  let options: FilterOption[] = isAjax.value ? ajaxOptions.value : props.filter.options || []
  if (props.currentValues?.[props.filter.value]) {
    const category: FilterConditionValue = props.currentValues[props.filter.value] || ({} as FilterRelationValue)

    let selected: FilterConditionValue[] = []
    for (let [key, val] of Object.entries(category)) {
      if (key === FilterRelations.Exists) {
        return []
      }
      selected = [...selected, ...(Array.isArray(val) ? val : [[val]])]
    }

    options = options.filter((o) => !selected.includes(String(o.value)))
  }

  return options
})

const selectedOptionValue = computed<FilterRelationValue>({
  get() {
    let val: FilterConditionValue = props.modelValue
    if (val) {
      for (let [relationKey, relationVal] of Object.entries(props.modelValue)) {
        let _relationKey = relationKey as string
        let _relationVal = relationVal as string

        if (_relationKey === FilterRelations.Exists) {
          val = ''
        } else {
          val = _relationVal?.[0] || ''
        }
      }
      if (isAjax.value && val) {
        addAjaxOption(val as FilterRelationValue)
      }
    }
    return val as FilterRelationValue
  },
  set(val: FilterRelationValue) {
    if (relationType.value === FilterRelations.Exists) return
    setValue(val)
  }
})

const changeRelationType = (relation: FilterRelations): void => {
  if (relationType.value === relation) return
  relationType.value = relation
  setValue(selectedOptionValue.value)
}
const setAjaxOptions = async (value: string): Promise<void> => {
  loading.value = true
  ajaxOptions.value = props.filter.getAjaxOptions && (await props.filter.getAjaxOptions(value))
  loading.value = false
}

const addAjaxOption = async (value: FilterRelationValue): Promise<void> => {
  const option = props.filter.getAjaxOne && (await props.filter.getAjaxOne(value))
  ajaxOptions.value = helper.uniqWith([...ajaxOptions.value, option], helper.isEqual)
}

const handleSearchChange = (value: string | unknown): void => {
  if (!isAjax.value || !value) return
  debounce(() => setAjaxOptions(value as string))
}

const setValue = (value: FilterRelationValue): void => {
  let currentValue: FilterRelationValue | null = null
  let currentValueName: FilterRelationName | null = null
  const hasVal = value || Number.isInteger(value)
  if (relationType.value !== FilterRelations.Exists && hasVal) {
    const name = props.filter.is_text
      ? value
      : computedOptions.value.find((o) => String(o.value) === String(value))?.name
    currentValue = { [relationType.value]: [String(value)] }
    currentValueName = { [relationType.value]: { [String(value)]: name } }
  }

  if (relationType.value === FilterRelations.Exists && !props.currentValues[props.filter.value]) {
    currentValue = { [FilterRelations.Exists]: 0 }
    currentValueName = { [FilterRelations.Exists]: null }
  }
  /**
   * Событие по изменению значения
   */

  const payload: IFilterCondition = {
    value: currentValue as FilterRelationValue,
    valueName: currentValueName as FilterRelationName
  }
  emit('update:modelValue', payload)
}

watch(
  () => props.modelValue,
  (val): void => {
    if (val) {
      for (let relationKey of Object.keys(val)) {
        relationType.value = relationKey as FilterRelations
      }
    }
  },
  { immediate: true }
)

watch(
  () => props.filter,
  (): void => {
    relationType.value = FilterRelations.Is
    nextTick(() => (ajaxOptions.value = []))
  }
)
</script>

<template>
  <component
    :is="component"
    v-model="selectedOptionValue as string"
    :options="computedOptions"
    :internal-search="!isAjax"
    :placeholder="computedPlaceholder"
    :loading="loading"
    :disabled="relationType === FilterRelations.Exists"
    hide-selected
    class="mc-filter-type-relation"
    :name="`relation_${props.filter.type}`"
    @search-change="handleSearchChange"
  >
    <template #header>
      <div class="mc-filter-type-relation__header">
        <mc-title>{{ placeholders.condition }}</mc-title>
        <div class="mc-filter-type-relation__buttons">
          <mc-button
            v-for="relation in relations"
            :key="relation"
            :variation="relationType === relation ? theme.component.button as ColorTypes : 'dark-gray-outline'"
            @click="() => changeRelationType(relation)"
          >
            {{ placeholders.actions[`${relation === FilterRelations.Exists ? 'empty' : relation}`] }}
          </mc-button>
        </div>
      </div>
    </template>
  </component>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/sizes' as *;
.mc-filter-type-relation {
  $block-name: &;
  width: 300px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: -$space-50;
    margin-top: -$space-50;
  }
  &__buttons {
    display: flex;
    @include child-indent-right($space-50);
    .mc-button {
      height: $size-300;
      padding: $space-50 $space-150;
    }
  }
}
</style>
