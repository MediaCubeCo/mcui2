# McFilter — данные и события для ИИ

## Назначение

Панель фильтрации: выбор полей из `filters`, условия (relation / text / range / date / fast), теги, пресеты, подтверждение.

## Модель (`v-model` / `modelValue`)

Тип `IFilterValue` (см. `mediacube-ui-v2/types/IFilter`):

- **`filter`**: объект условий; ключ — `IFilter.value` из схемы `filters`, значение — условие (`FilterConditionValue`: скаляр, `{ more, less }`, или relation-объект с `is` / `is_not` / `exists`).
- **`filter_name`**: строка (в API часто base64/URI-кодированный JSON) с человекочитаемыми подписями для тегов; после decode — `IFilterParsedValueFilterName` (параллельная структура ключам `filter`).

При инициализации и обновлении `modelValue` библиотека нормализует состояние (`normalizeMcFilterModel`): отбрасывает ключи не из `props.filters`, восстанавливает `filter_name` из `filter` при пустых подписях.

## Props (важное)

- **`name`** (string): идентификатор фильтра (пресеты в localStorage).
- **`filters`** (`IFilter[]`): схема полей; обязательна как источник правды по ключам.
- **`modelValue`**: `{ filter, filter_name }`.
- **`placeholders`**, **`open`**, **`withPresets`**, **`withActivator`**, **`useTimezone`**, и т.д. — см. автогенерируемые props в ai-catalog.

## События

- **`update:modelValue`**, **`confirm`**: актуальное значение после «Применить».
- **`error`**, **`clear`**, **`open`**, **`delete-preset`**.

## Практика

- Всегда передавайте **`filters`** с тем же набором `value`, что и ключи в сохранённом `filter`.
- Для relation с опциями используйте `options` или ajax-функции; доменные типы — `IRelationFilter`, `IFilter` в types.
