<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, type PropType, reactive, ref, useSlots } from 'vue'
import { useHelper } from '@/composables'
import { ChipSize, Weights } from '@/enums'
import {
  type ITableColumn,
  type ITableColumnEnriched,
  type ITableData,
  type ITableSort,
  type ITableTotals,
  type ITablePlaceholders,
  type TableCardState,
  type ITableCardProps
} from '@/types/ITable'
import { TABLE } from '@/consts/table'
import {
  McInfinityLoadingTrigger,
  McTitle,
  McChip,
  McTableSort,
  McTableSkeletonLoading,
  McNoData,
  McBottomLoader,
  McOverlay
} from '@/components'
import { useThrottleFn } from '@vueuse/core'
import { IconsListUnion, IDSOptions } from '@/types'
import { default as noTableDataImg } from '@/assets/img/no_table_data.png'

const dsOptions = inject<IDSOptions>('dsOptions', {})
const defaultPlaceholders = {
  no_data: 'No data',
  loading: 'Loading...',
  all_loaded: 'All loaded',
  total: 'Total'
} as ITablePlaceholders

const emit = defineEmits<{
  (e: 'loading'): void
  (e: 'row-click', value: any): void
  (e: 'sort', value: ITableSort): void
  (e: 'table-card-opened', value: TableCardState): void
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
    default: TABLE.defaultHeaderHeight
  },
  /**
   * Высота строки в теле таблицы
   * */
  rowHeight: {
    type: Number as PropType<number>,
    default: TABLE.defaultRowHeight
  },
  /**
   * Высота строки в подвале (строка с тоталами)
   * */
  footerRowHeight: {
    type: Number as PropType<number>,
    default: TABLE.defaultFooterRowHeight
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
    default: null
  },
  noDataImg: {
    type: String as PropType<string>,
    default: noTableDataImg
  },
  /**
   * Любые данные что бы передать их в карточку из таблицы
   * */
  toTableCardProps: {
    type: Object as PropType<Record<any, any>>,
    default: () => ({})
  }
})

const openCardState = ref<TableCardState>({ state: false })

const mcTable = ref<null | HTMLElement>(null)

const hasData = computed((): boolean => {
  return !helper.isEmpty(props.data)
})
const hasTotals = computed((): boolean => {
  return !helper.isEmpty(props.totals)
})
const hasFixedColumn = computed((): boolean => {
  return props.fixedFirstColumn || props.fixedLastColumn
})
const placeholders = reactive<ITablePlaceholders>(helper.deepMerge(defaultPlaceholders, props.placeholders))

const shadows = reactive({
  firstColHasShadow: false,
  lastColHasShadow: false
})

const tableClasses = computed(() => {
  return {
    'mc-table': true,
    'mc-table--card-opened': openCardState.value.state
  }
})

const computedColumns = computed((): ITableColumnEnriched[] => {
  const [first] = props.columns
  return (openCardState.value.state ? [first] : props.columns).map((column, index) => {
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
      }
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
    '--mc-table-footer-row-height': helper.isNumber(props.footerRowHeight) ? `${props.footerRowHeight}px` : '40px'
  }
})

const computedTableCardProps = computed((): ITableCardProps => {
  return {
    tableColumns: props.columns,
    tableData: props.data,
    tableTotals: props.totals,
    tableSort: props.sort,
    tableHeaderRowHeight: props.headerRowHeight,
    tableFooterRowHeight: props.footerRowHeight,
    tableFixedFirstColumn: props.fixedFirstColumn,
    tableCardProps: props.toTableCardProps
  }
})

onMounted((): void => {
  addListeners()
})
onBeforeUnmount((): void => {
  removeListeners()
})

const onBodyScroll = useThrottleFn((): void => {
  if (mcTable.value) {
    const { scrollLeft, scrollWidth, clientWidth } = mcTable.value
    const firstColShadow = props.fixedFirstColumn && scrollLeft > 0
    const lastColShadow = props.fixedLastColumn && scrollLeft + clientWidth < scrollWidth

    if (shadows.firstColHasShadow !== firstColShadow) shadows.firstColHasShadow = firstColShadow
    if (shadows.lastColHasShadow !== lastColShadow) shadows.lastColHasShadow = lastColShadow
  }
}, 5)

const addListeners = (): void => {
  if (hasFixedColumn.value && mcTable.value) {
    onBodyScroll()
    mcTable.value.addEventListener('scroll', onBodyScroll)
  }
}
const removeListeners = (): void => {
  if (hasFixedColumn.value && mcTable.value) mcTable.value.removeEventListener('scroll', onBodyScroll)
}

const handleRowClick = (row: any): void => {
  emit('row-click', row)
}

const handleSetCardState = (payload: TableCardState) => {
  openCardState.value = payload
  emit('table-card-opened', payload)
}
</script>

<template>
  <div class="mc-table__container" :style="containerStyle">
    <div ref="mcTable" :class="tableClasses">
      <div class="mc-table__table">
        <!-- HEADER -->
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
                  <!-- slot для ячейки колонки хедера -->
                  <slot name="header-cell" :column="column" :cellIndex="cI">
                    <mc-title :text-align="column.align" :weight="Weights.SemiBold" pre-line
                      >{{ column.header }}
                    </mc-title>
                  </slot>
                </div>
                <div class="mc-table__table_header-cell_content-right">
                  <!-- slot справа от хедера колонки -->
                  <slot :name="`${column.field}-header-right`" :column="column" :cellIndex="cI" />
                  <!-- slot для тотала (выводится в chip) -->
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

        <!-- BODY -->
        <div class="mc-table__table_body">
          <!-- Отображение скелетной загрузки -->
          <mc-table-skeleton-loading v-if="props.skeletonLoading" :columns="computedBodyColumns" />
          <template v-if="hasData">
            <div
              v-for="(row, rI) in data"
              :key="rI"
              class="mc-table__table_body-row"
              :class="{ 'mc-table__table_body-row--active': String(openCardState.id) === String(row.id) }"
              @click="() => handleRowClick(row)"
            >
              <div v-for="(column, cI) in computedBodyColumns" :key="cI" :class="column.class" :style="column.style">
                <div class="mc-table__table_body-cell_content">
                  <div class="mc-table__table_body-cell_content-left">
                    <!-- slot для контента ячейки (по именем колонки) -->
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
                  <!-- slot срава от контента (по именем колонки + '-right') -->
                  <div v-if="slots[`${column.field}-right`]" class="mc-table__table_body-cell_content-right">
                    <slot :name="`${column.field}-right`" />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!openCardState.state" class="mc-table__table_body-row mc-table__table_body-row--fake">
              <div v-for="(column, cI) in computedBodyColumns" :key="cI" :class="column.class" :style="column.style">
                <div class="mc-table__table_body-cell_content">
                  <div class="mc-table__table_body-cell_content-left"></div>
                  <div v-if="slots[`${column.field}-right`]" class="mc-table__table_body-cell_content-right"></div>
                </div>
              </div>
            </div>
          </template>
          <mc-infinity-loading-trigger
            v-if="props.hasLoadMore"
            :active="props.hasLoadMore"
            @loading="emit('loading')"
          />
        </div>

        <!-- FOOTER -->
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
    <!-- slot для карточки, по дефолту будет выводить карточку из вложенного роута -->
    <slot v-bind="computedTableCardProps" @setTableCardState="handleSetCardState">
      <!-- место для рендера карточки, когда она находится по вложенному роуту -->
      <router-view v-if="dsOptions?.meta?.router" v-bind="computedTableCardProps" @setTableCardState="handleSetCardState" />
    </slot>
    <mc-bottom-loader v-if="bottomLoading" />
    <mc-overlay v-if="loading" />
    <mc-no-data
      v-if="!hasData"
      variation="small"
      :title="placeholders.no_data"
      :img="props.noDataImg"
      :icon="props.noDataIcon"
    />
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/font-families' as *;
@use '../../../../assets/tokens/font-weights' as *;
@use '../../../../assets/tokens/font-sizes' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/box-shadows' as *;
@use '../../../../assets/tokens/z-indexes' as *;
@use '../../../../assets/tokens/media-queries' as *;
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
  @include grow;
  * {
    box-sizing: border-box;
  }
  &--card-opened {
    width: max-content;
  }
  &__container {
    --border-style: 1px solid #{$color-hover-gray};
    --table-row-hover-background-color: #{$color-hover-gray};
    --mc-table-height: auto;
    --mc-table-cell-width: auto;
    --mc-table-cell-max-width: auto;
    --mc-table-cell-min-width: auto;
    --mc-table-row-height: 40px;
    --mc-table-footer-row-height: 40px;

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
        min-height: var(--mc-table-header-row-height);
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
        min-height: var(--mc-table-row-height);
        cursor: pointer;
        &--active {
          #{$body}-cell {
            background-color: var(--table-row-hover-background-color);
          }
        }
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
        &--fake {
          min-height: 0;
          max-height: 100%;
          height: 100%;
          cursor: default;
          &:hover {
            #{$body}-cell {
              background-color: transparent;
              &_content-right {
                display: none;
              }
            }
          }
          @media #{$media-mobile} {
            #{$body}-cell {
              &_content-right {
                display: none;
              }
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
            min-height: var(--mc-table-row-height);
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
        min-height: var(--mc-table-footer-row-height);
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
