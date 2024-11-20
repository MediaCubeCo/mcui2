<script setup lang="ts">
import { Teleport } from 'vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McFieldSelect from '@/components/elements/McFieldSelect/McFieldSelect.vue'
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'
import McFilterTags from '@/components/patterns/McFilter/McFilterTags/McFilterTags.vue'
import McFilterTypeRange from '@/components/patterns/McFilter/McFilterTypeRange/McFilterTypeRange.vue'
import McFilterTypeDate from '@/components/patterns/McFilter/McFilterTypeDate/McFilterTypeDate.vue'
import McFilterTypeText from '@/components/patterns/McFilter/McFilterTypeText/McFilterTypeText.vue'
import McFilterTypeRelation from '@/components/patterns/McFilter/McFilterTypeRelation/McFilterTypeRelation.vue'
import McChip from '@/components/elements/McChip/McChip.vue'
import { defaultPlaceholders } from '@/mocks/filterMocks'

type TypeComponentInstanceType =
  | typeof McFilterTags
  | typeof McFilterTypeRange
  | typeof McFilterTypeDate
  | typeof McFilterTypeText
  | typeof McFilterTypeRelation

import { computed, onBeforeUnmount, onMounted, type PropType, reactive, ref, watch, nextTick } from 'vue'
import type {
  ButtonVariationUnion,
  FilterConditionName,
  FilterConditionValue,
  IFastFilter,
  IFilter,
  IFilterCondition,
  IFilterParsedValue,
  IFilterParsedValueFilter,
  IFilterParsedValueFilterName,
  IFilterPlaceholders,
  IFilterPreset,
  IFilterValue,
  ISelectOption,
  FilterRelationValue,
  FilterRelationName,
  IFilterRelationTag,
  IFilterDateValue,
  RangeFilterValue,
  IFilterRangeValue,
  IFilterTag
} from '@/types'
import { useHelper } from '@/composables/useHelper'
import { ButtonSize, ChipSize, FilterRelations, FilterTypes, TooltipPositions, TooltipSizes } from '@/enums'
import { useLocalStorage } from '@vueuse/core'
import { UseEncodeDecode } from '@/composables/useEncodeDecode'

const helper = useHelper()
const emit = defineEmits<{
  (e: 'error', value: string): void
  (e: 'clear', value: string): void
  (e: 'delete-preset', value: string): void
  (e: 'update:modelValue', value: IFilterValue): void
  (e: 'confirm', value: IFilterValue): void
}>()
const props = defineProps({
  /**
   *  Имя фильтра
   *  (для записи данных в стор)
   */
  name: {
    type: String as PropType<string>,
    required: true
  },
  /**
   *  Значение фильтра
   */
  modelValue: {
    type: Object as PropType<IFilterValue>,
    required: true,
    default: () => ({ filter: null, filter_name: null })
  },
  /**
   *  Типы фильтров
   */
  filters: {
    type: Array as PropType<IFilter[]>,
    required: true,
    default: () => []
  },
  /**
   *  Лоадинг кнопки применить фильтр
   */
  buttonConfirmIsLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Использовать ли teleport (для рендеринга вне компонента)
   *  Если да то необходимо создать блок с id="filterTeleportTarget" в который будет рендериться тело фильтра
   */
  useTeleport: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Доступен ли фильтр для открытия
   */
  disabledOpen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Нужно ли учитывать часовой пояс при работе с фильтром типа Date
   * */
  useTimezone: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Переводы плейсхолеров и текстов
   */
  placeholders: {
    type: Object as PropType<Partial<IFilterPlaceholders>>,
    default: () => ({})
  }
})

const typeComponents: Partial<Record<FilterTypes, TypeComponentInstanceType>> = {
  [FilterTypes.Relation]: McFilterTypeRelation,
  [FilterTypes.Date]: McFilterTypeDate,
  [FilterTypes.Text]: McFilterTypeText,
  [FilterTypes.Range]: McFilterTypeRange
}

const isOpen = ref<boolean>(false)

// текущие значения фильтра filter / filter_name
const currentValues = ref<IFilterParsedValueFilter>({})
const currentValuesName = ref<IFilterParsedValueFilterName>({})

//временные значения, до нажатия на кнопку применить фильтр
const temporaryFilter = ref<IFilterParsedValueFilter>({})
const temporaryFilterName = ref<IFilterParsedValueFilterName>({})

// текущие выбранные значения в типе фильтра
const currentCondition = ref<FilterConditionValue>({})
const currentConditionName = ref<FilterConditionName>({})

// значение выбранного фильтра из списка фильтров
const selectedOptionFilter = ref<string | null>(null)

const activeTag = ref<IFilterRelationTag | null>(null)

const placeholders = reactive<IFilterPlaceholders>(helper.deepMerge(defaultPlaceholders, props.placeholders))

const isDisableConfirmButton = computed(() => {
  return helper.isEqual(computedModelValue.value.filter, currentValues.value)
})

const newPresetName = ref<string>('')
const activePreset = ref<IFilterPreset | null>(null)
const temporaryActivePreset = ref<IFilterPreset | null>(null)
const filterLocalStorage = useLocalStorage<Record<string, IFilterPreset[]>>('mcFilterPresets', {})
const presets = ref<IFilterPreset[]>([])

const computedModelValue = computed({
  get(): IFilterParsedValue {
    const { filter = null, filter_name = null } = props.modelValue || {}

    return {
      filter: filter,
      filter_name: UseEncodeDecode.decode(filter_name)
    } as IFilterParsedValue
  },
  set(val: IFilterParsedValue) {
    const { filter = null, filter_name = {} } = val || {}

    const payload: IFilterValue = {
      filter: filter,
      filter_name: UseEncodeDecode.encode(filter_name)
    } as IFilterValue
    emit('update:modelValue', payload)
  }
})

// выбранный фильтр из списка фильтров
const currentFilter = computed((): IFilter | undefined => {
  return props.filters.find((f) => String(f.value) === String(selectedOptionFilter.value))
})

// компонент выбранного фильтра
const currentComponent = computed((): TypeComponentInstanceType | null => {
  if (!currentFilter.value || !currentFilter.value.type) return null
  return typeComponents[currentFilter.value.type] || null
})

// отфильтрованные быстрые фильтры
const fastFilters = computed((): IFastFilter[] => {
  const selected = (currentValues.value && Object.keys(currentValues.value)) || []
  return props.filters.filter((f) => f.type === FilterTypes.Fast && !selected.includes(f.value)) as IFastFilter[]
})

// отфильтрованные фильтры кроме быстрых
const regularFilters = computed((): ISelectOption[] => {
  return props.filters.filter((f) => f.type !== FilterTypes.Fast)
})

const visibilityToggleVariation = computed((): ButtonVariationUnion => {
  return isOpen.value || !isDisableConfirmButton.value ? 'purple-invert' : 'black-flat'
})

// видна ли кнопка добавить фильтр
const hasButtonAdd = computed((): boolean => {
  return (
    !helper.isEmpty(currentCondition.value) && !!currentFilter.value && currentFilter.value.type !== FilterTypes.Fast
  )
})

// задизэйблена ли кнопка создать, для пресетов
const buttonCreateIsDisable = computed((): boolean => {
  return !newPresetName.value.trim()
})

const init = () => {
  temporaryFilter.value = computedModelValue.value.filter
  temporaryFilterName.value = computedModelValue.value.filter_name

  currentValues.value = computedModelValue.value.filter
  currentValuesName.value = computedModelValue.value.filter_name
}

onMounted((): void => {
  updatePresets()
  window.addEventListener('storage', updatePresets)

  init()
})

onBeforeUnmount((): void => {
  window.removeEventListener('storage', updatePresets)
})

const updatePresets = (): void => {
  presets.value = filterLocalStorage.value[props.name] || ([] as IFilterPreset[])
}

const handlerSetFastFilter = (tag: IFastFilter): void => {
  const { relation, value } = tag

  const filterValue = relation ? { [relation]: tag.default } : tag.default

  selectedOptionFilter.value = value
  handleConditionChange({ value: filterValue, valueName: tag.name })
  handleStoreTag()
}

const handleConditionChange = ({ value, valueName }: IFilterCondition): void => {
  currentCondition.value = value
  currentConditionName.value = valueName || ''
}

const handleStoreTag = (): void => {
  activeTag.value ? editTag() : addTag()
}

const editTag = (): void => {
  switch (currentFilter.value?.type) {
    case FilterTypes.Relation: {
      editRelationValue()
      break
    }
    default: {
      addSimpleValue()
      break
    }
  }
  activeTag.value = null
}

const addTag = (): void => {
  switch (currentFilter.value?.type) {
    case FilterTypes.Relation: {
      addRelationValue()
      break
    }
    default: {
      addSimpleValue()
      break
    }
  }
  activeTag.value = null
}

const editRelationValue = (): void => {
  if (activeTag.value) {
    const tagRelationValue = activeTag.value.relationKey === FilterRelations.Exists ? [0] : [activeTag.value.value]
    const tagRelation = {
      [activeTag.value.category]: {
        [activeTag.value.relationKey as FilterRelations]: tagRelationValue
      }
    }

    const selectedRelation: IFilterParsedValueFilter = {
      [selectedOptionFilter.value as string]: helper.cloneDeep(currentCondition.value)
    }
    if (helper.isEqual(selectedRelation, tagRelation)) {
      /**
       * Событие по возникшей ошибке
       */
      emit('error', placeholders.messages.same_filter)
      return
    }
  }
  const { category, categoryName }: { category: FilterRelationValue; categoryName: FilterRelationName } =
    getCategoriesWithNewRelation()

  if (activeTag.value) {
    if (activeTag.value.relationKey === FilterRelations.Exists) {
      delete category[activeTag.value.relationKey]
      delete categoryName[activeTag.value.relationKey]
    } else {
      const numerableValues = category[activeTag.value.relationKey]
      const index = numerableValues?.indexOf(String(activeTag.value.value)) ?? -1
      if (index !== -1) {
        category?.[activeTag.value.relationKey]?.splice(index, 1)
        helper.isEmpty(category[activeTag.value.relationKey]) && delete category[activeTag.value.relationKey]
        delete categoryName?.[activeTag.value.relationKey]?.[activeTag.value.value]
        helper.isEmpty(categoryName[activeTag.value.relationKey]) && delete categoryName[activeTag.value.relationKey]
      }
    }
  }

  setFilterValues(category, categoryName)
}

const addRelationValue = (): void => {
  const { category, categoryName } = getCategoriesWithNewRelation()
  setFilterValues(category, categoryName)
}

const getCategoriesWithNewRelation = (): { category: FilterRelationValue; categoryName: FilterRelationName } => {
  const relationKeys = Object.keys(currentCondition.value) as FilterRelations[]
  const values = helper.cloneDeep(currentValues.value)
  const valuesName = helper.cloneDeep(currentValuesName.value)
  const selectedCategory: FilterRelationValue = values[selectedOptionFilter.value as string]
  const selectedCategoryName: FilterRelationName = valuesName[selectedOptionFilter.value as string]

  selectedCategory &&
    relationKeys.forEach((k) => {
      if (k === FilterRelations.Exists) {
        selectedCategory[FilterRelations.Exists] = 0
        selectedCategoryName[FilterRelations.Exists] = null
      } else {
        //@ts-ignore
        const conditionValue = currentCondition.value[k]
        //@ts-ignore
        const conditionName = currentConditionName.value[k]

        if (k in selectedCategory) {
          //@ts-ignore
          selectedCategory[k] = helper.uniqWith([...selectedCategory[k], ...conditionValue], helper.isEqual)
          selectedCategoryName[k] = {
            ...selectedCategoryName[k],
            ...conditionName
          }
        } else {
          selectedCategory[k] = conditionValue
          selectedCategoryName[k] = conditionName
        }
      }
    })
  return { category: selectedCategory, categoryName: selectedCategoryName }
}

const setFilterValues = (val: FilterConditionValue, valName: FilterConditionName): void => {
  const newVal: IFilterParsedValueFilter = {
    ...currentValues.value,
    [selectedOptionFilter.value as string]: val || currentCondition.value
  }
  if (helper.isEqual(currentValues.value, newVal)) {
    /**
     * Событие по возникшей ошибке
     */
    emit('error', placeholders.messages.same_filter)
    return
  }
  currentValues.value = newVal
  currentValuesName.value = {
    ...currentValuesName.value,
    [selectedOptionFilter.value as string]: valName || currentConditionName.value
  }

  setEmptyCondition()
}

const setEmptyCondition = (): void => {
  switch (currentFilter.value?.type) {
    case FilterTypes.Text:
    case FilterTypes.Relation:
      handleConditionChange({ value: '' })
      break
    case FilterTypes.Range:
    case FilterTypes.Date:
      handleConditionChange({ value: {} })
      break
    default:
      break
  }
}

const addSimpleValue = (): void => {
  if (currentFilter.value?.type === FilterTypes.Range && Object.keys(currentCondition.value || {}).length === 2) {
    const _currentCondition = currentCondition.value as IFilterRangeValue
    if (_currentCondition.more && _currentCondition.less && _currentCondition.more > _currentCondition.less) {
      /**
       * Событие по возникшей ошибке
       */
      emit('error', placeholders.messages.more_than)
      return
    }
  }
  setFilterValues(currentCondition.value, currentCondition.value as FilterConditionName)
}

const onTagsChange = (val: IFilterParsedValueFilterName): void => {
  activeTag.value = null
  if (helper.isEmpty(val)) {
    currentValues.value = {}
    currentValuesName.value = {}
    return
  }
  currentValuesName.value = helper.cloneDeep(val)
  setRelationsToArrayFormat(val)
}

const handleClearAllTags = (): void => {
  temporaryFilter.value = {}
  temporaryFilterName.value = {}

  currentValues.value = {}
  currentValuesName.value = {}
  /**
   * Событие по очистке выбранных фильтров из поля
   */
  emit('clear', placeholders.messages.accidentally_cleared)
}

const setRelationsToArrayFormat = (obj: IFilterParsedValueFilterName): void => {
  const newObj = helper.cloneDeep(obj)
  const relationKeys = [FilterRelations.Is, FilterRelations.IsNot]
  for (let [categoryKey, categoryVal] of Object.entries(obj)) {
    if (categoryVal.constructor === Object) {
      for (let [key, val] of Object.entries(categoryVal)) {
        if (relationKeys.includes(key as FilterRelations) && val?.constructor === Object) {
          newObj[categoryKey][key] = [...Object.keys(val)]
        }
      }
    }
  }
  currentValues.value = newObj
}

const onTagClick = (tag: IFilterTag): void => {
  activeTag.value = (helper.isEqual(activeTag.value, tag) ? null : tag) as IFilterRelationTag
  if (!activeTag.value) {
    setEmptyCondition()
    return
  }
  let condition = null
  let conditionName = null
  if (tag.relationKey) {
    condition = {
      [tag.relationKey]: tag.relationKey === FilterRelations.Exists ? [0] : [String(tag.value)]
    }
    conditionName = {
      [tag.relationKey]: tag.relationKey === FilterRelations.Exists ? [0] : { [tag.value]: tag.title }
    }
  } else {
    condition = tag.value?.constructor === Object ? tag.value : String(tag.value)
    conditionName = tag.value
  }

  selectedOptionFilter.value = tag.category
  nextTick(() => {
    currentCondition.value = condition
    currentConditionName.value = conditionName
  })
}

const handleConfirm = (): void => {
  /**
   * Событие по изменению значения фильтра
   */
  computedModelValue.value = {
    filter: currentValues.value,
    filter_name: currentValuesName.value
  } as IFilterParsedValue

  const payload: IFilterValue = {
    filter: currentValues.value,
    filter_name: UseEncodeDecode.encode(currentValuesName.value)
  } as IFilterValue

  emit('confirm', payload)
}

/**
 * PRESETS BELOW
 * */

const handlePresetMouseUp = (preset: IFilterPreset) => {
  if (activePreset.value && activePreset.value.name === preset.name) {
    activePreset.value = null
    currentValues.value = {}
    currentValuesName.value = {}
  } else {
    activePreset.value = preset
    currentValues.value = helper.cloneDeep(preset.filter)
    currentValuesName.value = helper.cloneDeep(preset.filter_name)
  }
  if (!isOpen.value) {
    handleConfirm()
  }
}

const handleDeletePreset = (preset: IFilterPreset | null): void => {
  const filteredPresets = filterLocalStorage.value[props.name]?.filter((p) => preset && p.name !== preset.name)
  filterLocalStorage.value[props.name] = [...filteredPresets]
  temporaryActivePreset.value = helper.cloneDeep(activePreset.value)
  activePreset.value = null
  currentValues.value = {}
  currentValuesName.value = {}
  /**
   * Событие по удалению пресета
   */
  emit('delete-preset', placeholders.messages.accidentally_deleted)
}

const handleCreatePreset = (): void => {
  if (
    filterLocalStorage.value[props.name] &&
    filterLocalStorage.value[props.name].find((p) => p.name?.trim() === newPresetName.value?.trim())
  ) {
    emit('error', placeholders.messages.same_preset_name)
    return
  }
  const preset: IFilterPreset = {
    name: newPresetName.value?.trim(),
    filter: helper.cloneDeep(currentValues.value),
    filter_name: helper.cloneDeep(currentValuesName.value)
  }

  const currentPreset = filterLocalStorage.value[props.name]
  if (currentPreset) {
    filterLocalStorage.value[props.name] = [preset, ...currentPreset]
  } else {
    filterLocalStorage.value[props.name] = [preset]
  }

  newPresetName.value = ''
  activePreset.value = { ...preset }
}

const getPresetButtonVariation = (preset: IFilterPreset): ButtonVariationUnion => {
  return activePreset.value && activePreset.value.name === preset.name ? 'purple-invert' : 'gray-outline'
}

watch(
  () => props.modelValue,
  (val: IFilterValue): void => {
    const filter_value: IFilterValue = val || {
      filter: null,
      filter_name: null
    }
    currentValues.value = { ...filter_value.filter }
    if (filter_value.filter_name) {
      try {
        currentValuesName.value = UseEncodeDecode.decode(filter_value.filter_name)
      } catch (e) {
        console.error(`Can't parse filters`)
      }
    }
  },
  { deep: true }
)

watch(
  () => currentFilter.value,
  (): void => {
    handleConditionChange({ value: '' })
  },
  { deep: true }
)

watch(
  () => currentValues.value,
  (newVal, oldVal): void => {
    if (activePreset.value) {
      const mappedPresets = filterLocalStorage.value[props.name].map((p) => {
        if (activePreset.value && p.name === activePreset.value.name) {
          return {
            name: p.name,
            filter: helper.cloneDeep(currentValues.value),
            filter_name: helper.cloneDeep(currentValuesName.value)
          }
        }
        return p
      })
      filterLocalStorage.value[props.name] = [...mappedPresets]
    }
  }
)
</script>

<template>
  <div class="mc-filter">
    <div class="mc-filter__header">
      <mc-tooltip :content="placeholders.main_tooltip" :placement="TooltipPositions.Top" :size="TooltipSizes.S">
        <mc-button
          :variation="visibilityToggleVariation"
          :disabled="disabledOpen"
          :bg-flat="isOpen"
          :size="ButtonSize.MCompact"
          @click="isOpen = !isOpen"
        >
          <template #icon-prepend>
            <mc-svg-icon name="filter_list" />
          </template>
        </mc-button>
      </mc-tooltip>
      <div v-if="presets" class="mc-filter__presets">
        <div class="mc-filter__presets-inner">
          <mc-button
            v-for="preset in presets"
            :key="preset.name"
            :variation="getPresetButtonVariation(preset)"
            secondary-color="purple"
            @mouseup="() => handlePresetMouseUp(preset)"
          >
            {{ preset.name }}
          </mc-button>
        </div>
      </div>
    </div>
    <component v-if="isOpen" :is="useTeleport ? Teleport : 'div'" to="#filterTeleportTarget">
      <div class="mc-filter__body">
        <div class="mc-filter__body-top">
          <div class="mc-filter__body-top-left">
            <mc-field-select
              v-model="selectedOptionFilter"
              :title="placeholders.value"
              :options="regularFilters"
              :placeholder="placeholders.choose"
              :hide-selected="false"
              class="mc-filter__main-select"
              name="filter_value_name"
            />
            <template v-if="currentFilter">
              <component
                :is="currentComponent"
                :model-value="currentCondition"
                :filter="currentFilter"
                :placeholders="placeholders"
                :current-values="!activeTag ? currentValues : {}"
                :use-timezone="props.useTimezone"
                @update:modelValue="handleConditionChange"
              />
              <mc-button v-if="hasButtonAdd" variation="purple-outline" @click="handleStoreTag">
                {{ placeholders.actions[activeTag ? 'save' : 'add'] }}
              </mc-button>
            </template>
          </div>
        </div>
        <mc-filter-tags
          :model-value="currentValuesName"
          :filters="filters"
          :placeholders="placeholders"
          :active-tag="activeTag"
          :use-timezone="props.useTimezone"
          @tag-change="(payload) => onTagsChange(payload)"
          @tag-click="(payload) => onTagClick(payload)"
          @clear="handleClearAllTags"
        />
        <section class="mc-filter__body-fast-tags-wrapper">
          <mc-tooltip
            v-for="(tag, i) in fastFilters"
            :key="i"
            :content="tag.description || ''"
            :placement="TooltipPositions.Top"
            :size="TooltipSizes.S"
          >
            <mc-chip variation="gray-outline" text-color="black" :size="ChipSize.S" @click="handlerSetFastFilter(tag)">
              {{ tag.name }}
            </mc-chip>
          </mc-tooltip>
        </section>
        <div class="mc-filter__body-bottom">
          <div class="mc-filter__body-bottom-left">
            <mc-button
              :disabled="isDisableConfirmButton"
              :loading="buttonConfirmIsLoading"
              :size="ButtonSize.S"
              @click="handleConfirm"
            >
              {{ placeholders.actions.confirm }}
            </mc-button>
            <mc-button
              v-if="activePreset"
              variation="red-outline"
              :size="ButtonSize.S"
              @click="() => handleDeletePreset(activePreset)"
            >
              {{ placeholders.actions.delete_preset }}
              <template #icon-append>
                <mc-svg-icon name="delete" size="250" color="red" />
              </template>
            </mc-button>
          </div>
          <div class="mc-filter__body-bottom-right">
            <mc-title class="mc-filter__preset-input-title">
              {{ placeholders.create_preset }}
              <template #icon-append>
                <mc-tooltip
                  :content="placeholders.enter_preset_tooltip"
                  :placement="TooltipPositions.Top"
                  :size="TooltipSizes.S"
                >
                  <mc-svg-icon name="help_solid" size="250" color="outline-gray" />
                </mc-tooltip>
              </template>
            </mc-title>
            <mc-field-text
              v-model="newPresetName"
              :placeholder="placeholders.enter_preset_name"
              :max-length="20"
              class="mc-filter__preset-input"
              name="preset_name"
            />
            <mc-button
              :disabled="buttonCreateIsDisable"
              variation="purple-outline"
              :size="ButtonSize.S"
              @click="handleCreatePreset"
            >
              {{ placeholders.actions.create }}
            </mc-button>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<style lang="scss">
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/spacings';
@import '../../../assets/tokens/colors';
@import '../../../assets/tokens/sizes';
.mc-filter {
  $block-name: &;
  flex-grow: 1;
  min-width: 0;
  &__header {
    display: flex;
    @include child-indent-right($space-100);
  }

  &__presets {
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

  &__body {
    padding: $space-200 $space-200 $space-300 $space-200;
    background-color: $color-hover-gray;
    @include child-indent-bottom($space-200);
    &-top {
      display: flex;
      @include child-indent-right($space-400);

      &-left,
      &-right {
        @include child-indent-right($space-100);
      }
      &-left {
        display: flex;
        align-items: flex-end;
      }
    }
    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include child-indent-right($space-400);

      &-left {
        > *:not(:first-child) {
          margin-inline-start: $space-200;
        }
      }
      &-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        @include child-indent-right($space-100);
        .mc-title,
        .mc-tooltip-target {
          display: inline-flex;
          align-items: center;
        }
      }
      .mc-button {
        &--disabled {
          opacity: 1;
          background-color: fade-out($color-dark-gray, 0.8);
          color: $color-dark-gray;
          border-color: fade-out($color-dark-gray, 1);
          .mc-button__background {
            display: none;
          }
        }
      }
    }
    &-fast-tags-wrapper {
      margin: -($space-50);
      & > .mc-tooltip-target {
        .mc-chip {
          cursor: pointer;
          margin: calc(#{$space-100} / 2) calc(#{$space-50} / 2);
          &:hover {
            background-color: $color-outline-gray;
          }
        }
      }
    }
  }
  &__main-select,
  &__preset-input {
    width: 270px;
  }
  &__preset-input-title {
    width: auto;
  }
}
</style>
