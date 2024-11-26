<script setup lang="ts">
import { dayjs } from '@/utils/dayjs'

import { McButton, McTooltip, McTitle, McGridRow, McGridCol, McFilterChip } from '@/components'
import { computed, type PropType, ref, watch } from 'vue'
import { useRandomNumber, useHelper } from '@/composables'
import { TooltipPositions, TooltipSizes } from '@/enums'
import { FilterRelations, FilterTypes } from '@/enums/Filter'
import type {
  FilterConditionName,
  IFilter,
  IFilterTag,
  IFilterPlaceholders,
  IFilterParsedValueFilterName,
  FilterMoreLessConditionName,
  RangeFilterValue,
  DateFilterValue
} from '@/types/IFilter'

const helper = useHelper()
const randomNumber = useRandomNumber()

const emit = defineEmits<{
  (e: 'tag-click', value: IFilterTag): void
  (e: 'tag-change', value: IFilterParsedValueFilterName): void
  (e: 'clear'): void
}>()
const props = defineProps({
  /**
   *  Данные фильтра
   */
  modelValue: {
    type: Object as PropType<IFilterParsedValueFilterName>,
    default: () => ({})
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
   *  Переводы локализаций
   */
  placeholders: {
    type: Object as PropType<IFilterPlaceholders>,
    required: true
  },
  /**
   *  Активный тэг
   */
  activeTag: {
    type: Object as PropType<IFilterTag | null>,
    default: () => ({})
  },
  useTimezone: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})

const simpleValues = ref<IFilterParsedValueFilterName>({})
const relationValues = ref<IFilterParsedValueFilterName>({})
const prettyActiveTag = ref<IFilterTag | null>(null)

const fastFilterTags = computed((): IFilterTag[] => {
  return simpleTags.value.filter((st) => st && st.type === FilterTypes.Fast)
})

const tagsWithoutFast = computed(() => {
  return simpleTags.value.filter((st) => st && st.type !== FilterTypes.Fast)
})

const simpleTags = computed((): IFilterTag[] => {
  const tags: IFilterTag[] = []
  !helper.isEmpty(simpleValues.value) &&
    Object.entries(simpleValues.value).forEach(([key, value]) => {
      const _key = key as string
      let _value = value as FilterConditionName

      const filter: IFilter = props.filters.find((f) => f.value === _key) || ({} as IFilter)
      if (filter && filter.type === FilterTypes.Fast) {
        tags.push({
          id: randomNumber.timestamp(5),
          categoryName: filter?.name,
          category: _key,
          type: FilterTypes.Fast
        } as IFilterTag)
      } else if (filter) {
        _value = value as FilterMoreLessConditionName
        const from = _value.more ? `${props.placeholders.from} ${getFormattedVal(_value.more, filter)}` : ''

        const to = _value.less
          ? `${props.placeholders.to} ${getFormattedVal(
              filter.type === FilterTypes.Date
                ? props.useTimezone
                  ? dayjs(_value.less).subtract(1, 'days').format()
                  : dayjs(_value.less).format()
                : _value.less,
              filter
            )}`
          : ''
        const space = from && to ? ' ' : ''
        const title = typeof value === 'object' ? `${from}${space}${to}`.toLowerCase() : value
        tags.push({
          id: randomNumber.timestamp(5),
          categoryName: filter?.name,
          title,
          value,
          category: _key
        } as IFilterTag)
      }
    })
  return tags
})

const relationRows = computed((): IFilterTag[][] => {
  let tags: IFilterTag[][] = []

  if (!helper.isEmpty(relationValues.value)) {
    tags = Object.entries(relationValues.value).map(([relationKey, relationVal]) => {
      const _relationKey = relationKey as string
      const _relationVal = relationVal as IFilterParsedValueFilterName

      if (relationKey === FilterRelations.Exists) {
        const empties: IFilterTag[] = Object.keys(_relationVal).map((key) => {
          const filter = props.filters.find((f) => f.value === key)
          return {
            id: randomNumber.timestamp(5),
            categoryName: filter?.name,
            value: key,
            category: key,
            relationKey,
            closable: true
          } as IFilterTag
        })
        const head = {
          id: randomNumber.timestamp(5),
          categoryName: props.placeholders.actions.empty,
          relationKey: FilterRelations.Exists
        } as IFilterTag

        return [head, ...empties]
      }
      const values: IFilterTag[] = []
      Object.entries(_relationVal).forEach(([categoryKey, categoryVal]) => {
        const _categoryKey = categoryKey as string
        const _categoryVal = categoryVal as FilterConditionName

        const filter: IFilter = props.filters.find((f) => f.value === _categoryKey) || ({} as IFilter)
        Object.entries(_categoryVal).forEach(([key, val]) => {
          values.push({
            id: randomNumber.timestamp(5),
            categoryName: filter?.name,
            title: val,
            value: key,
            category: _categoryKey,
            relationKey,
            closable: true
          } as IFilterTag)
        })
      })
      const head = {
        id: randomNumber.timestamp(5),
        //@ts-ignore
        categoryName: props.placeholders.actions?.[_relationKey],
        relationKey
      } as IFilterTag

      return [head, ...values]
    })
  }
  return tags.filter((t) => t.length > 1)
})

const hasButtonClear = computed(() => {
  return relationRows.value.length || simpleTags.value.length
})

const splitTags = (value: FilterConditionName) => {
  simpleValues.value = {}
  relationValues.value = {}
  if (helper.isEmpty(value)) return
  addInitTags(value)
}

const addInitTags = (parentVal: FilterConditionName, parentKey?: string) => {
  const relationKeys = [FilterRelations.Is, FilterRelations.IsNot, FilterRelations.Exists]

  for (let [key, val] of Object.entries(parentVal)) {
    if (relationKeys.includes(key as FilterRelations)) {
      relationValues.value[key] = {
        ...((relationValues.value[key] || {}) as object),
        ...(parentKey ? { [parentKey]: val } : {})
      } as FilterConditionName
      continue
    }
    if (val.constructor !== Object && parentKey) {
      simpleValues.value[parentKey] = parentVal
      continue
    }
    const filter = props.filters.find((f) => f.value === key)
    if (filter && filter.type === FilterTypes.Fast) {
      simpleValues.value[key] = { value: key } as FilterConditionName
      continue
    }
    val && addInitTags(val, key)
  }
}

const onTagClick = (tag: IFilterTag) => {
  prettyActiveTag.value = helper.isEqual(prettyActiveTag.value, tag) ? null : tag
  /**
   * Событие по клику на тэг
   */
  emit('tag-click', tag)
}
const onTagClose = (tag: IFilterTag, relationKey?: FilterRelations) => {
  const value = helper.cloneDeep(props.modelValue)
  switch (relationKey) {
    case FilterRelations.Exists:
      delete value[tag.category][relationKey]
      break
    case FilterRelations.Is:
    case FilterRelations.IsNot:
      //@ts-ignore
      delete value[tag.category][relationKey][tag.value]
      if (helper.isEmpty(value[tag.category][relationKey])) {
        delete value[tag.category][relationKey]
      }
      break
    default:
      delete value[tag.category]
      break
  }

  if (helper.isEmpty(value[tag.category])) {
    delete value[tag.category]
  }
  /**
   * Событие по изменению набора тэгов
   */
  emit('tag-change', value as IFilterParsedValueFilterName)
}

const handleClear = () => {
  /**
   * Событие по очистке всех тэгов
   */
  emit('clear')
}

const getFormattedVal = (val: RangeFilterValue | DateFilterValue, filter: IFilter) => {
  switch (filter.type) {
    case FilterTypes.Date:
      return dayjs(val).format('DD.MM.YYYY')
    case FilterTypes.Range:
      return getFormattedNum(val)
    default:
      return val
  }
}

const getFormattedNum = (num: RangeFilterValue) => {
  return num
}

const checkTagIsActive = (tag: IFilterTag) => {
  return helper.isEqual(prettyActiveTag.value, tag)
}

watch(
  () => props.modelValue,
  (val) => {
    splitTags(val)
  },
  { deep: true, immediate: true }
)

watch(
  () => props.activeTag,
  (val) => {
    prettyActiveTag.value = val
  },
  { immediate: true }
)
</script>

<template>
  <div class="mc-filter-tags">
    <mc-title>{{ props.placeholders.added_filters }}</mc-title>
    <div class="mc-filter-tags__body">
      <div class="mc-filter-tags__body-left">
        <mc-grid-row v-if="tagsWithoutFast.length" :gutter-x="4" :gutter-y="8">
          <mc-grid-col v-for="tag in tagsWithoutFast" :key="tag.id">
            <mc-filter-chip
              :tag="tag"
              :is-active="checkTagIsActive(tag)"
              closable
              @click="() => onTagClick(tag)"
              @close="() => onTagClose(tag)"
            />
          </mc-grid-col>
        </mc-grid-row>
        <template v-if="relationRows.length">
          <mc-grid-row v-for="(row, index) in relationRows" :key="index" :gutter-x="4" :gutter-y="8">
            <mc-grid-col v-for="tag in row" :key="tag.id">
              <mc-filter-chip
                :tag="tag"
                :is-active="checkTagIsActive(tag)"
                :closable="tag.closable"
                @click="() => onTagClick(tag)"
                @close="() => onTagClose(tag, row[0].relationKey)"
              />
            </mc-grid-col>
          </mc-grid-row>
        </template>
        <mc-grid-row v-if="fastFilterTags.length" :gutter-x="4" :gutter-y="8">
          <mc-grid-col v-for="tag in fastFilterTags" :key="tag.id">
            <mc-tooltip :content="tag.description || ''" :placement="TooltipPositions.Top" :size="TooltipSizes.S">
              <mc-filter-chip :tag="tag" closable @close="() => onTagClose(tag)" />
            </mc-tooltip>
          </mc-grid-col>
        </mc-grid-row>
      </div>
      <div class="mc-filter-tags__body-right">
        <mc-button v-if="hasButtonClear" variation="dark-gray-outline" @click="handleClear">
          {{ placeholders.actions.clear }}
        </mc-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/border-radius' as *;
.mc-filter-tags {
  $block-name: &;
  @include child-indent-bottom($space-100);
  &__body {
    display: flex;
    justify-content: space-between;
    padding: $space-100;
    border: 1px solid $color-outline-gray;
    border-radius: $radius-100;
    background-color: $color-white;
    min-height: $space-500;
    &-left {
      flex-grow: 1;
    }
    &-right {
      margin-inline-start: $space-100;
      .mc-button {
        padding: $space-50 $space-150;
        height: $space-300;
      }
    }
    .mc-grid-row {
      &:not(:last-child) {
        margin-bottom: $space-50 !important;
      }
    }
  }
}
</style>
