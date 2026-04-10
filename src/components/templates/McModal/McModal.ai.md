# McModal — для ИИ

## Назначение

Модальное окно с `v-model` (открыто/закрыто), оверлеем, анимацией, опциональной кнопкой «назад» и слотами под заголовок и контент.

## Критичные props

- **`modelValue`** (boolean): видимость.
- **`name`**: идентификатор для стека модалок (сервис плагина).
- **`maxWidth`**, **`minWidth`**, **`showOverlay`**, **`closeVisible`**, **`clickBackdropToClose`** и др. — см. ai-catalog.

## События

- **`update:modelValue`**, **`before-open`**, **`opened`**, **`before-close`**, **`closed`**, **`back`**.

## Композиция

- Глобально модалки часто открываются через API плагина (`modalComponents` в `app.use(MediacubeUi)`); **`McModalContainer`** рендерит стек. Локально можно использовать `McModal` с `v-model`.

## Частые ошибки

- Забыть зарегистрировать компонент контента в `modalComponents` при программном открытии через сервис.
