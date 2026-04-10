# McChat — для ИИ

## Назначение

Лента комментариев/чата с полем ввода, отправкой, удалением (при `editable`), аватаром и бесконечной подгрузкой истории.

## Критичные props

- **`comments`** (`IComment[]`): см. `mediacube-ui-v2/types/IComment`.
- **`modelValue`**: текст в поле ввода.
- **`editable`**: разрешить удаление/действия.
- **`title`**, **`avatar`**, **`placeholder`**, **`loading`**, **`hasMore`** и др. — см. ai-catalog.

## События

- **`submit`**, **`delete`**, **`update:modelValue`**, **`loading`**, устаревшие алиасы `chat-submit`, `chat-input`, `chat-delete`.

## Композиция

- Использует `McChatForm`, `McChatComment`, `McDrawerContentTemplate`, `McInfinityLoadingTrigger`.

## Частые ошибки

- Путать старые события `chat-*` с новыми `submit`/`delete`; синхронизировать `modelValue` с формой ввода.
