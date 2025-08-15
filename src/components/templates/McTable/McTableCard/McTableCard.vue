<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, ref, useSlots, watch } from 'vue'
import {
  type ITableColumn,
  type ITableColumnWidth,
  type ITableData,
  type ITableSort,
  type ITableTotals,
  type TableCardState
} from '@/types/ITable'
import { TABLE } from '@/consts/table'
import { useHelper } from '@/composables'

const slots = useSlots()
const emit = defineEmits<{
  (e: 'set-table-card-state', value: TableCardState): void
  (e: 'card-id-updated', value: TableCardState): void
}>()

/**
 * Если карточка исползуется как отдельная страница!
 *  1. Если карточка используется как рутовый узел страницы, то компонент McTableCard, автоматически получит все пропсы от таблицы
 *  2. Если карточка используется НЕ как рутовый узел, нужно принять в компоненте все пропсы как в карточке, и передать их в компонент McTableCard
 *
 *  При использовании как описано в п1. Автоматически получит все пропсы от таблицы, так же будут доступны через slot-scope в дефолтном слоте.
 * */
const props = defineProps({
  /**
   * Обязательно что бы таблица правильно подсвечивала выбранную строку. Проверка будет по полю id
   * Если карточка используется как рутовый узел страницы, будет автоматически приходить router.params.id
   * */
  id: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  tableColumns: {
    type: Array as PropType<ITableColumnWidth[]>,
    default: () => []
  },
  tableData: {
    type: Array as PropType<ITableData>,
    default: () => []
  },
  tableTotals: {
    type: Object as PropType<ITableTotals<ITableColumn>>,
    default: () => ({})
  },
  tableSort: {
    type: Object as PropType<ITableSort>,
    default: () => ({})
  },
  tableFixedFirstColumn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  tableHeaderRowHeight: {
    type: Number as PropType<number>,
    default: TABLE.defaultHeaderHeight
  },
  tableFooterRowHeight: {
    type: Number as PropType<number>,
    default: TABLE.defaultFooterRowHeight
  },
  tableCardProps: {
    type: Object as PropType<Record<any, any>>,
    default: () => ({})
  },
  footerBlur: {
    type: Boolean,
    default: false
  }
})

const helper = useHelper()

const tableFirstColWidth = computed((): number => {
  const [first] = props.tableColumns
  return first?.width ? first.width : TABLE.defaultTableFirstColWidth
})

const bodyEl = ref<HTMLElement | null>(null)
const body_scrolled_to_bottom = ref(true)

const computedFooterClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-table-card__footer': !!slots.footer,
    'mc-table-card__footer--with-blur': props.footerBlur && !body_scrolled_to_bottom.value
  }
})

const cardStyle = computed((): { [key: string]: string } => {
  const borderCompensations = -1
  return {
    '--table-card-header-height': helper.isNumber(props.tableHeaderRowHeight)
      ? `${props.tableHeaderRowHeight + borderCompensations}px`
      : `${TABLE.defaultHeaderHeight}px`,
    '--table-card-footer-height': helper.isNumber(props.tableFooterRowHeight)
      ? `${props.tableFooterRowHeight + borderCompensations}px`
      : `${TABLE.defaultFooterRowHeight}px`,
    marginLeft: `${tableFirstColWidth.value}px`
  }
})

onMounted(() => {
  if (props.footerBlur) {
    initBlur()
  }
  handleEmitTableCardState({ state: true, id: props.id })
})

onBeforeUnmount(() => {
  bodyEl.value && bodyEl.value.removeEventListener('scroll', handlerScroll)
  handleEmitTableCardState({ state: false })
})

const initBlur = () => {
  try {
    body_scrolled_to_bottom.value = false
    bodyEl.value && bodyEl.value.addEventListener('scroll', handlerScroll)
  } catch (e) {
    console.error(e)
  }
}

const handlerScroll = () => {
  try {
    if (bodyEl.value) {
      const { offsetHeight, scrollTop, scrollHeight } = bodyEl.value
      body_scrolled_to_bottom.value = offsetHeight + scrollTop === scrollHeight
    }
  } catch (e) {
    body_scrolled_to_bottom.value = true
    console.error(e)
  }
}

const handleEmitTableCardState = (payload: TableCardState) => {
  emit('set-table-card-state', payload)
}

watch(
  () => props.footerBlur,
  (val) => {
    if (val) {
      initBlur()
    } else {
      bodyEl.value && bodyEl.value.removeEventListener('scroll', handlerScroll)
    }
  }
)
watch(
  () => props.id,
  (id) => {
    const state: TableCardState = { state: true, id }
    handleEmitTableCardState(state)
    emit('card-id-updated', state)
  }
)
</script>

<template>
  <div class="mc-table-card" :style="cardStyle">
    <div v-if="$slots.header" class="mc-table-card__header">
      <!-- @slot Слот заголовка -->
      <slot name="header" />
    </div>
    <div ref="bodyEl" class="mc-table-card__body">
      <!-- @slot Слот контента -->
      <slot v-bind="props" />
    </div>
    <div v-if="$slots.footer || footerBlur" :class="computedFooterClasses">
      <!-- @slot Слот футера -->
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/colors' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/sizes' as *;
@use '../../../../assets/tokens/z-indexes' as *;
.mc-table-card {
  $block-name: &;

  --table-card-header-height: #{$size-500};
  --table-card-footer-height: #{$size-500};
  @include position(absolute, 0);
  z-index: $z-index-overlay;
  background-color: $color-white;
  border-inline-start: 1px solid $color-hover-gray;
  display: flex;
  flex-direction: column;
  @include custom-scroll();

  &__header {
    height: var(--table-card-header-height);
    border-bottom: 1px solid $color-hover-gray;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
  }

  &__footer {
    border-top: 1px solid $color-hover-gray;
    height: var(--table-card-footer-height);
    flex-shrink: 0;
    padding: 0 $space-200;
    display: flex;
    align-items: center;
    @include child-indent-right($space-150);
    &:empty {
      display: none;
    }
    &--with-blur {
      position: relative;
      &::after {
        @include pseudo;
        height: $space-900;
        background: linear-gradient(to top, $color-white, transparent);
        position: absolute;
        width: 100%;
        inset-inline-start: 0;
        bottom: 100%;
        pointer-events: none;
      }
    }
  }
}
</style>
