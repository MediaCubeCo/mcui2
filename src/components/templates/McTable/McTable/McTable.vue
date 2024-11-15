<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, type PropType, reactive, ref, useSlots } from 'vue'
import { useHelper } from '@/composables/useHelper'
import { ChipSize, Weights } from '@/enums'
import type { ITableColumn, ITableColumnEnriched, ITableData, ITableSort, ITableTotals, ITablePlaceholders } from '@/types/ITable'
import McInfinityLoadingTrigger from '@/components/elements/McInfinityLoadingTrigger/McInfinityLoadingTrigger.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McChip from '@/components/elements/McChip/McChip.vue'
import McTableSort from '@/components/templates/McTable/McTableSort/McTableSort.vue'
import McTableSkeletonLoading from '@/components/templates/McTable/McTableSkeletonLoading/McTableSkeletonLoading.vue'
import McNoData from '@/components/elements/McNodata/McNoData.vue'
const McBottomLoader = defineAsyncComponent(() => import('@/components/elements/McBottomLoader/McBottomLoader.vue'))
const McOverlay = defineAsyncComponent(() => import('@/components/patterns/McOverlay/McOverlay.vue'))
import { useThrottleFn } from '@vueuse/core'
import type { IconsListUnion } from '@/types'
import noTableDataImg from '../../../../assets/img/no_table_data.png'

const defaultPlaceholders = {
  no_data: 'No data',
  loading: 'Loading...',
  all_loaded: 'All loaded',
  total: 'Total',
} as ITablePlaceholders

const emit = defineEmits<{
  (e: 'loading'): void
  (e: 'sort', value: ITableSort): void
}>()

/**
 * Слоты
 *
 * #header-cell - Заголовок колонки, каждая колонка
 * #`{column.field}-header-right` - Справа от заголовка колонки, именной слот, работает по имени колонки, что бы добавлять в конкретную колонку
 * #`{column.field}-total` - Тотал колонки, именной слот, работает по имени колонки, что бы добавлять в конкретную колонку
 * #column.field - Тело ячейки таблицы. Если не использовать слот, просто будут выводиться данные по названию поля
 * #`{column.field}-right` - Справа от контента колонки, именной слот, работает по имени колонки, что бы добавлять в конкретную колонку
 * №footer-cell - тотал колонки (строка внизу таблицы), каждая колонка
 * */

const helper = useHelper()
const slots = useSlots()
const props = defineProps({
  columns: {
    type: Array as PropType<ITableColumn[]>,
    required: true,
    default: () => [] as ITableColumn[]
  },
  data: {
    type: Array as PropType<ITableData>,
    required: true,
    default: () => []
  },
  /**
   * Тоталы таблицы (отображаются в футере), обьект ключи которого = поле field из массива колонок
   * */
  totals: {
    type: Object as PropType<ITableTotals<ITableColumn>>,
    default: () => ({})
  },
  sort: {
    type: Object as PropType<ITableSort>,
    default: () => ({})
  },
  /**
   * Фиксировать ли первую колонку таблицы
   * */
  fixedFirstColumn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * Фиксировать ли последнюю колонку таблицы
   * */
  fixedLastColumn: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Есть ли у таблицы еще данные, если true, при полном пролистывании таблицы вниз, будет вызываться метод @loading
   * */
  hasLoadMore: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  height: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 'auto'
  },
  /**
   * Высота строки в шапке
   * */
  headerRowHeight: {
    type: Number as PropType<number>,
    default: 40
  },
  /**
   * Высота строки в теле таблицы
   * */
  rowHeight: {
    type: Number as PropType<number>,
    default: 40
  },
  /**
   * Высота строки в подвале (строка с тоталами)
   * */
  footerRowHeight: {
    type: Number as PropType<number>,
    default: 40
  },
  /**
   *  Отрисовка всей таблицы и полоса загрузки в каждой ячейке (скелетная загрузка)
   */
  skeletonLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Лоадинг внизу таблицы
   * */
  bottomLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Оверлей с затемнение на всю таблицу
   * */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Переводы плейсхолеров и текстов
   */
  placeholders: {
    type: Object as PropType<Partial<ITablePlaceholders>>,
    default: () => ({})
  },
  noDataIcon: {
    type: String as () => IconsListUnion,
    default: null,
  },
  noDataImg: {
    type: String as PropType<string>,
    default: noTableDataImg,
  },
})

const mcTable = ref<null | HTMLElement>(null)

const hasData = computed(() => {
  return !helper.isEmpty(props.data)
})
const hasTotals = computed(() => {
  return !helper.isEmpty(props.totals)
})
const hasFixedColumn = computed(() => {
  return props.fixedFirstColumn || props.fixedLastColumn
})
const placeholders = reactive<ITablePlaceholders>(helper.deepMerge(defaultPlaceholders, props.placeholders))

const shadows = reactive({
  firstColHasShadow: false,
  lastColHasShadow: false
})

const computedColumns = computed((): ITableColumnEnriched[] => {
  return props.columns.map((column, index) => {
    const fixedFirst = props.fixedFirstColumn && index === 0
    const fixedLast = props.fixedLastColumn && index === props.columns.length - 1

    return {
      ...column,
      fixedFirst,
      fixedLast,
      style: {
        ...(column.width
          ? {
            '--mc-table-cell-width': `${column.width}px`,
            '--mc-table-cell-max-width': `${column.width}px`,
            '--mc-table-cell-min-width': `${column.width}px`
          }
          : {
            '--mc-table-cell-min-width': column.minWidth && `${column.minWidth}px`,
            '--mc-table-cell-width': '100%'
          })
      },
    }
  })
})

const computedHeaderColumns = computed((): ITableColumnEnriched[] => {
  return computedColumns.value.map((column) => ({
    ...column,
    class: {
      'mc-table__table_header-cell': true,
      'mc-table__table_header-cell--fixed-first': column.fixedFirst,
      'mc-table__table_header-cell--fixed-last': column.fixedLast,
      'mc-table__table_header-cell--shadow-first': column.fixedFirst && shadows.firstColHasShadow,
      'mc-table__table_header-cell--shadow-last': column.fixedLast && shadows.lastColHasShadow
    }
  }))
})

const computedBodyColumns = computed((): ITableColumnEnriched[] => {
  return computedColumns.value.map((column) => ({
    ...column,
    class: {
      'mc-table__table_body-cell': true,
      'mc-table__table_body-cell--fixed-first': column.fixedFirst,
      'mc-table__table_body-cell--fixed-last': column.fixedLast,
      'mc-table__table_body-cell--shadow-first': column.fixedFirst && shadows.firstColHasShadow,
      'mc-table__table_body-cell--shadow-last': column.fixedLast && shadows.lastColHasShadow
    }
  }))
})

const computedFooterColumns = computed((): ITableColumnEnriched[] => {
  return computedColumns.value.map((column) => ({
    ...column,
    class: {
      'mc-table__table_footer-cell': true,
      'mc-table__table_footer-cell--fixed-first': column.fixedFirst,
      'mc-table__table_footer-cell--fixed-last': column.fixedLast,
      'mc-table__table_footer-cell--shadow-first': column.fixedFirst && shadows.firstColHasShadow,
      'mc-table__table_footer-cell--shadow-last': column.fixedLast && shadows.lastColHasShadow
    }
  }))
})

const containerStyle = computed((): { [key: string]: string } => {
  return {
    '--mc-table-height': typeof props.height === 'number' ? `${props.height}px` : props.height,
    '--mc-table-header-row-height': helper.isNumber(props.headerRowHeight) ? `${props.headerRowHeight}px` : '40px',
    '--mc-table-row-height': helper.isNumber(props.rowHeight) ? `${props.rowHeight}px` : '40px',
    '--mc-table-footer-row-height': helper.isNumber(props.headerRowHeight) ? `${props.headerRowHeight}px` : '40px'
  }
})

const onBodyScroll = useThrottleFn(() => {
  if (mcTable.value) {
    const { scrollLeft, scrollWidth, clientWidth } = mcTable.value
    const firstColShadow = (props.fixedFirstColumn && scrollLeft > 0)
    const lastColShadow = (props.fixedLastColumn && scrollLeft + clientWidth < scrollWidth)

    if (shadows.firstColHasShadow !== firstColShadow) shadows.firstColHasShadow = firstColShadow
    if (shadows.lastColHasShadow !== lastColShadow) shadows.lastColHasShadow = lastColShadow
  }
}, 10)

const addListeners = () => {
  if (hasFixedColumn.value && mcTable.value) {
    onBodyScroll()
    mcTable.value.addEventListener('scroll', onBodyScroll)
  }
}
const removeListeners = () => {
  if (hasFixedColumn.value && mcTable.value) mcTable.value.removeEventListener('scroll', onBodyScroll)
}

onMounted(() => {
  addListeners()
})
onBeforeUnmount(() => {
  removeListeners()
})
</script>

<template>
  <div class="mc-table__container" :style="containerStyle">
    <div ref="mcTable" class="mc-table">
      <div class="mc-table__table">
        <div class="mc-table__table_header">
          <div class="mc-table__table_header-row">
            <div v-for="(column, cI) in computedHeaderColumns" :key="cI" :class="column.class" :style="column.style">
              <div class="mc-table__table_header-cell_content">
                <div class="mc-table__table_header-cell_content-left">
                  <mc-table-sort
                    v-if="column.sortable"
                    :column="column.field"
                    :sort="sort"
                    @change="(val) => emit('sort', val)"
                  />
                  <slot name="header-cell" :column="column" :cellIndex="cI">
                    <mc-title :text-align="column.align" :weight="Weights.SemiBold" pre-line
                      >{{ column.header }}
                    </mc-title>
                  </slot>
                </div>
                <div class="mc-table__table_header-cell_content-right">
                  <slot :name="`${column.field}-header-right`" :column="column" :cellIndex="cI" />
                  <slot :name="`${column.field}-total`" :column="column" :cellIndex="cI">
                    <mc-chip
                      v-if="column.total"
                      :title="column.total"
                      variation="hover-gray"
                      text-color="gray"
                      :size="ChipSize.S"
                    />
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mc-table__table_body">
          <!-- Отображение скелетной загрузки -->
          <mc-table-skeleton-loading v-if="props.skeletonLoading" :columns="computedBodyColumns" />
          <template v-if="hasData">
            <div v-for="(row, rI) in data" :key="rI" class="mc-table__table_body-row">
              <div v-for="(column, cI) in computedBodyColumns" :key="cI" :class="column.class" :style="column.style">
                <div class="mc-table__table_body-cell_content">
                  <div class="mc-table__table_body-cell_content-left">
                    <slot
                      :name="column.field"
                      :row="row"
                      :rowIndex="rI"
                      :column="column"
                      :cellIndex="cI"
                      :cellValue="row[column.field]"
                    >
                      <mc-title :text-align="column.align" ellipsis>{{ row[column.field] }}</mc-title>
                    </slot>
                  </div>
                  <div v-if="slots[`${column.field}-right`]" class="mc-table__table_body-cell_content-right">
                    <slot :name="`${column.field}-right`" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <mc-infinity-loading-trigger :active="props.hasLoadMore" @loading="emit('loading')" />
        </div>
        <div v-if="hasTotals" class="mc-table__table_footer">
          <div class="mc-table__table_footer-row">
            <div v-for="(column, cI) in computedFooterColumns" :key="cI" :class="column.class" :style="column.style">
              <slot name="footer-cell" :column="column" :cellIndex="cI" :cellValue="totals[column.field]">
                <mc-title :text-align="column.align" :weight="Weights.SemiBold">
                  {{ totals[column.field] }}
                </mc-title>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mc-bottom-loader v-if="bottomLoading" />
    <mc-overlay v-if="loading" />
    <mc-no-data v-if="!hasData" variation="small" :title="placeholders.no_data" :img="props.noDataImg" :icon="props.noDataIcon" />
  </div>
</template>

<style lang="scss">
@import '../../../../assets/styles/mixins';
@import '../../../../assets/tokens/colors';
@import '../../../../assets/tokens/font-families';
@import '../../../../assets/tokens/font-weights';
@import '../../../../assets/tokens/font-sizes';
@import '../../../../assets/tokens/spacings';
@import '../../../../assets/tokens/sizes';
@import '../../../../assets/tokens/box-shadows';
@import '../../../../assets/tokens/z-indexes';
@import '../../../../assets/tokens/media-queries';
@mixin fixed-first {
  left: 0;
  z-index: $z-index-notification;
  border-right: var(--border-style);
  background-color: $color-white;
}
@mixin fixed-last {
  right: 0;
  z-index: $z-index-notification;
  background-color: $color-white;
}
@mixin fixed-classes {
  &--fixed-first {
    @include fixed-first;
  }
  &--fixed-last {
    @include fixed-last;
  }
}
@mixin shadow-classes {
  &--shadow-first {
    @include shadow-first;
  }
  &--shadow-last {
    @include shadow-last;
  }
}
@mixin shadow-first {
  border-right-color: $color-transparent;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: none;
    width: 1px;
    height: 100%;
    box-shadow: 5px 0 8px $color-black;
    pointer-events: none;
  }
}
@mixin shadow-last {
  border-left-color: $color-transparent;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: none;
    width: 1px;
    height: 100%;
    box-shadow: -5px 0 8px $color-black;
    pointer-events: none;
  }
}
@mixin grow {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
@mixin cell-alignment {
  display: flex;
  align-items: center;
  padding: 0 $space-200;
}
.mc-table {
  font-family: $font-family-main;
  overflow-y: auto;
  max-height: 100%;
  flex-grow: 1;
  @include grow;
  * {
    box-sizing: border-box;
  }
  &__container {
    --border-style: 1px solid #{$color-hover-gray};
    --table-row-hover-background-color: #{$color-hover-gray};
    position: relative;
    overflow: hidden;
    font-size: $font-size-200;
    height: var(--mc-table-height);
    border: var(--border-style);
    @include grow;
  }
  &__table {
    @include grow;
    &_header {
      position: sticky;
      top: 0;
      z-index: $z-index-overlay;
      &-row {
        display: flex;
        flex-wrap: nowrap;
        height: var(--mc-table-header-row-height);
      }
      &-cell {
        position: sticky;
        text-align: left;
        top: 0;
        z-index: 10;
        width: var(--mc-table-cell-width);
        max-width: var(--mc-table-cell-max-width);
        min-width: var(--mc-table-cell-min-width);
        background-color: $color-white;
        border-bottom: var(--border-style);
        @include cell-alignment;
        @include fixed-classes;
        @include shadow-classes;
        &_content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-left {
            display: flex;
            align-items: center;
            @include child-indent-right($space-50);
          }
          &-right {
            display: flex;
            align-items: center;
            @include child-indent-right($space-50);
          }
        }
      }
    }
    &_body {
      @include grow;
      $body: &;
      &-row {
        display: flex;
        flex-wrap: nowrap;
        height: var(--mc-table-row-height);
        &:hover {
          #{$body}-cell {
            background-color: var(--table-row-hover-background-color);
            &_content-right {
              display: flex;
            }
          }
        }
        @media #{$media-mobile} {
          #{$body}-cell {
            &_content-right {
              display: flex;
            }
          }
        }
      }
      &-cell {
        position: sticky;
        z-index: 15;
        text-align: left;
        width: var(--mc-table-cell-width);
        max-width: var(--mc-table-cell-max-width);
        min-width: var(--mc-table-cell-min-width);
        @include cell-alignment;
        @include fixed-classes;
        @include shadow-classes;
        &_content {
          width: 100%;
          &-right {
            position: absolute;
            display: none;
            top: 0;
            right: 0;
            padding-right: $space-200;
            padding-left: $space-200;
            height: var(--mc-table-row-height);
            align-items: center;
            background: linear-gradient(90deg, rgba($color-hover-gray, 0.2) 0%, $color-hover-gray 60%);
            z-index: $z-index-notification;
            @include child-indent-right($space-50);
          }
          &-left {
            display: flex;
            align-items: center;
            @include child-indent-right($space-50);
          }
        }
      }
    }
    &_footer {
      position: sticky;
      bottom: 0;
      z-index: $z-index-notification;
      &-row {
        display: flex;
        flex-wrap: nowrap;
        height: var(--mc-table-footer-row-height);
      }
      &-cell {
        position: sticky;
        z-index: 15;
        text-align: left;
        width: var(--mc-table-cell-width);
        max-width: var(--mc-table-cell-max-width);
        min-width: var(--mc-table-cell-min-width);
        background-color: $color-white;
        border-top: var(--border-style);
        @include cell-alignment;
        @include fixed-classes;
        @include shadow-classes;
      }
    }
  }
}
</style>
