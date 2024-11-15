<script setup lang="ts">
import { dayjs } from '@/utils/dayjs'

import McButton from '@/components/elements/McButton/McButton.vue'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McGridRow from '@/components/patterns/McGridRow/McGridRow.vue'
import McGridCol from '@/components/patterns/McGridCol/McGridCol.vue'
import McFilterChip from '@/components/patterns/McFilter/McFilterChip/McFilterChip.vue'
import { computed, type PropType, ref, watch } from 'vue'
import { useRandomNumber } from '@/composables/useRandomNumber'
import { TooltipPositions, TooltipSizes } from '@/enums'
import { useHelper } from '@/composables/useHelper'
import { FilterRelations, FilterTypes } from '@/enums/Filter'
import type {
  FilterConditionName,
  IFilter,
  IFilterChip,
  IFilterPlaceholders, IFilterTag
} from '@/types/IFilter'

const helper = useHelper()
const randomNumber = useRandomNumber()

const emit = defineEmits<{
  (e: 'tag-click', value: IFilterChip): void
  (e: 'tag-change', value: IFilterChip): void
  (e: 'clear'): void
}>()
const props = defineProps({
  /**
   *  Данные фильтра
   */
  modelValue: {
    type: Object as PropType<FilterConditionName>,
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
    type: Object as PropType<IFilterChip | null>,
    default: () => ({})
  },
  useTimezone: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})

const simpleValues = ref({})
const relationValues = ref({})
const prettyActiveTag = ref<IFilterChip | null>(null)

const fastFilterTags = computed(() => {
  return simpleTags.value.filter((st) => st && st.type === FilterTypes.Fast)
})

const tagsWithoutFast = computed(() => {
  return simpleTags.value.filter((st) => st && st.type !== FilterTypes.Fast)
})

const simpleTags = computed((): IFilterChip[] => {
  const tags: IFilterChip[] = []

  !helper.isEmpty(simpleValues.value) &&
    Object.entries(simpleValues.value).forEach(([key, value]) => {
      const filter = props.filters.find((f) => f.value === key)
      if (filter && filter.type === FilterTypes.Fast) {
        tags.push({
          id: randomNumber.timestamp(5),
          categoryName: filter?.name,
          category: key,
          type: FilterTypes.Fast,
          ...filter
        } as IFilterTag)
      } else if (filter) {
        const from = value.more
          ? `${props.placeholders.from} ${getFormattedVal(value.more, filter)}`
          : ''

        const to = value.less
          ? `${props.placeholders.to} ${getFormattedVal(
              filter.type === FilterTypes.Date
                ? props.useTimezone
                  ? dayjs(value.less).subtract(1, 'days').format()
                  : dayjs(value.less).format()
                : value.less,
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
          category: key
        } as IFilterTag)
      }
    })
  return tags
})

const relationRows = computed(() => {
  let tags: IFilterTag[] = []
  if (!helper.isEmpty(relationValues.value)) {
    tags = Object.entries(relationValues.value).map(([relationKey, relationVal]) => {
      if (relationKey === FilterRelations.Exists) {
        const empties = Object.keys(relationVal).map((key) => {
          const filter = props.filters.find((f) => f.value === key)
          return {
            id: randomNumber.timestamp(5),
            categoryName: filter?.name,
            value: key,
            category: key,
            relationKey,
            closable: true
          }
        })
        const head = {
          id: randomNumber.timestamp(5),
          categoryName: props.placeholders.actions.empty,
          relationKey: FilterRelations.Exists
        }
        return [head, ...empties]
      }
      const values = []
      Object.entries(relationVal).forEach(([categoryKey, categoryVal]) => {
        const filter = props.filters.find((f) => f.value === categoryKey)
        Object.entries(categoryVal).forEach(([key, val]) => {
          values.push({
            id: randomNumber.timestamp(5),
            categoryName: filter?.name,
            title: val,
            value: key,
            category: categoryKey,
            relationKey,
            closable: true
          })
        })
      })
      const head = {
        id: randomNumber.timestamp(5),
        categoryName: props.placeholders.actions[relationKey],
        relationKey
      }
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

const addInitTags = (parentVal: FilterConditionName, parentKey = null) => {
  const relationKeys = [FilterRelations.Is, FilterRelations.IsNot, FilterRelations.Exists]
  for (let [key, val] of Object.entries(parentVal)) {
    if (relationKeys.includes(key)) {
      const relationValuesKey = {
        ...(key in relationValues.value ? relationValues.value[key] : {}),
        ...(parentKey ? { [parentKey]: val } : {})
      }
      relationValues.value[key] = relationValuesKey
      continue
    }
    if (typeof val !== 'object' && parentKey) {
      simpleValues.value[parentKey] = parentVal
      continue
    }
    const filter = props.filters.find((f) => f.value === key)
    if (filter && filter.type === FilterTypes.Fast) {
      simpleValues.value[key] = { value: key }
      continue
    }
    val && addInitTags(val, key)
  }
}

const onTagClick = (tag: IFilterChip) => {
  prettyActiveTag.value = helper.isEqual(prettyActiveTag.value, tag) ? null : tag
  /**
   * Событие по клику на тэг
   */
  emit('tag-click', tag)
}
const onTagClose = (tag: IFilterChip, relationKey = null) => {
  const value = helper.cloneDeep(props.modelValue)
  switch (relationKey) {
    case FilterRelations.Exists:
      delete value[tag.category][relationKey]
      break
    case FilterRelations.Is:
    case FilterRelations.IsNot:
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
  emit('tag-change', value)
}

const handleClear = () => {
  /**
   * Событие по очистке всех тэгов
   */
  emit('clear')
}

const getFormattedVal = (val, filter) => {
  switch (filter.type) {
    case 'date':
      return dayjs(val).format('DD.MM.YYYY')
    case 'range':
      return getFormattedNum(val)
    default:
      return val
  }
}

const getFormattedNum = (num) => {
  return num
}

const checkTagIsActive = (tag) => {
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
          <mc-grid-row
            v-for="(row, index) in relationRows"
            :key="index"
            :gutter-x="4"
            :gutter-y="8"
          >
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
            <mc-tooltip
              :content="tag.description || ''"
              :placement="TooltipPositions.Top"
              :size="TooltipSizes.S"
            >
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
@import '../../../../assets/styles/mixins';
@import '../../../../assets/tokens/spacings';
@import '../../../../assets/tokens/colors';
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
