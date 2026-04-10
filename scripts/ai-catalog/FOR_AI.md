# mediacube-ui-v2 — краткий гайд для ИИ и разработчиков

## Установка

```bash
npm install mediacube-ui-v2
# или yarn add mediacube-ui-v2
```

## Vue 3: плагин и стили

```ts
import MediacubeUi from 'mediacube-ui-v2'
import 'mediacube-ui-v2/style'

app.use(MediacubeUi, {
  drawerComponents: {},
  modalComponents: {},
  toasts: {},
  defaultAvatar: null,
  colors: undefined,
  themes: undefined,
  theme: undefined,
  meta: { router_push: null }
})
```

Опции плагина и Nuxt — см. основной README пакета (`Installation`, `Usage`).

## SVG-спрайты

Иконки (`McSvgIcon` и др.) ожидают спрайт в DOM. Вставьте сырой SVG один раз (например в `App.vue` / layout):

```vue
import mediacubeUiIconsSprite from 'mediacube-ui-v2/iconsSprite.svg?raw'
// в шаблоне: <span v-html="mediacubeUiIconsSprite" />
```

Флаги для `McTopBar`: `mediacube-ui-v2/iconsSpriteFlags.svg?raw`. Подробности — README раздел **Svg icons**.

## Импорты компонентов

Tree-shaking, путь из **ai-catalog** поля `importPath`, например:

- `import McButton from 'mediacube-ui-v2/components/elements/McButton'`

Шаблон: `mediacube-ui-v2/components/{elements|patterns|templates}/...`

## Импорты типов и enum

```ts
import type { IFilterValue } from 'mediacube-ui-v2/types/IFilter'
import { FilterTypes } from 'mediacube-ui-v2/enums/Filter'
```

Полный список: `mediacube-ui-v2/types/*`, `mediacube-ui-v2/enums/*` (см. `package.json` exports).

## Машиночитаемый каталог (ai-catalog)

После сборки библиотеки в пакете есть:

- `node_modules/mediacube-ui-v2/dist/ai-catalog/index.json` — все компоненты, props, emits, `storyHints`, ссылки на типы.
- `mediacube-ui-v2/ai-catalog.json` (export) — то же.
- `mediacube-ui-v2/ai-catalog/for-ai.md` — этот файл.
- `mediacube-ui-v2/ai-catalog/types/*` — снимки исходников `src/types` для файлов из графа импортов + allowlist.
- `recommended-entrypoints.json` — рекомендуемые точки входа по сценариям.

Поле **`catalogSchemaVersion`** в `index.json` меняется при несовместимых изменениях формата.

## MCP (Cursor и др.)

Сервер в репозитории DS: `npm run mcp:ui` (скрипт `scripts/mcp-ui-server.mjs`).

Инструменты: `list_components`, `search_ui`, `get_component`, `list_types`, `get_type`, `get_ai_guide`.

Переменные: `MEDIACUBE_UI_CATALOG_PATH`, `MEDIACUBE_UI_CATALOG_URL`. Пример конфигурации — README пакета, раздел «Документация для ИИ».

## Проверка версии

Сверяйте `libraryVersion` в `index.json` с `version` в `package.json` потребителя — документация и типы должны соответствовать установленной версии.
