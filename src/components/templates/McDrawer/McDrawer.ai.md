# McDrawer — для ИИ

## Назначение

Выдвижная панель с **`v-model`**, позицией (лево/право и т.д.), шириной, оверлеем и кнопкой закрытия.

## Критичные props

- **`modelValue`**: открыт/закрыт.
- **`position`**: из `DrawerPositions` (`mediacube-ui-v2/enums/Drawer`).
- **`width`**: число ≤100 — проценты, иначе px.
- **`showOverlay`**, **`disableBgClick`**, **`closeVisible`**, **`iconClose`**.

## События

- **`update:modelValue`**, **`open`**, **`close`**, **`toggle`**.

## Композиция

- Для каскада и сервиса используется **`McDrawerContainer`** и регистрация в **`drawerComponents`** плагина. `McDrawerContentTemplate` — шаблон контента внутри дровера.

## Частые ошибки

- Не передать `drawerComponents` в плагин при открытии дроверов через сервис — контент не смонтируется.
