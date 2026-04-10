# McTable — для ИИ

## Назначение

Таблица с колонками, сортировкой, чекбоксами строк, бесконечной подгрузкой, карточным режимом, тоталами и кастомными слотами на ячейки/шапку.

## Критичные props

- **`columns`** (`ITableColumn[]`): `header`, `field`, `width` или `minWidth`, опционально `sortable`, `align`. См. `mediacube-ui-v2/types/ITable`.
- **`data`** (`ITableData`): строки; значения по `column.field`.
- **`sort`** (`ITableSort`): `sort_column`, `sort_direction` (`null` | `asc` | `desc`).
- **`placeholders`**, **`loading`**, **`hasMore`**, **`card`**, **`selectedRows`** — см. карточку в ai-catalog.

## События

- **`sort`**, **`row-click`**, **`loading`**, **`update:selected-rows`**, **`table-card-opened`**.

## Композиция

- Внутри используются `McTableSort`, `McTableSkeletonLoading`, `McNoData`, `McOverlay`, `McInfinityLoadingTrigger`.
- Именованные слоты вида `#columnField`, `#field-header-right`, `#footer-cell` — см. JSDoc в исходнике компонента.

## Частые ошибки

- Путать `field` в колонке с ключом в `data`; типы колонок и тоталов должны согласовываться с `ITableTotals`.
