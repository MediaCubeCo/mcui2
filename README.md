# mediacube-ui-v2 by Mediacube corp.

This template should help get you started developing with Vue 3 in Vite.

# Installation #
####  Using npm or yarn

```shell
yarn add mediacube-ui-v2
#or
npm install mediacube-ui-v2
```

# Usage #
###  Nuxt@3.X
```ts
//Nuxt plugin
import { defineNuxtPlugin } from '#app';
import MediacubeUi from 'mediacube-ui-v2'

//import { IToast } from 'mediacube-ui-v2/types/IToast'
//import { Themes } from 'mediacube-ui-v2/enums'
//import { ColorThemes } from 'mediacube-ui-v2/types'

import { ThemesColors, UiThemes } from 'mediacube-ui-v2'

// ThemesColors - JSON wtih all colors in UI
// UiThemes - JSON wtih all themes in UI

export default defineNuxtPlugin( (nuxtApp) => {
  nuxtApp.vueApp.use(MediacubeUi, {
    drawerComponents: {},
    modalComponents: {},
    toasts?: Partial<IToast>
    defaultAvatar?: string | null,
    router?: null | Router,
    colors?: Record<string, string>,
    themes?: ColorThemes,
    theme?: Themes,
  })
})

// nuxt.config.ts
css: ['mediacube-ui-v2/style', 'mediacube-ui-v2/font']


```
###  Vue@3.X
```ts
import MediacubeUi from 'mediacube-ui-v2'
import 'mediacube-ui-v2/style'
import 'mediacube-ui-v2/font'

//import { IToast } from 'mediacube-ui-v2/types/IToast'
//import { Themes } from 'mediacube-ui-v2/enums'
//import { ColorThemes } from 'mediacube-ui-v2/types'

import { ThemesColors, UiThemes } from 'mediacube-ui-v2'

// ThemesColors - JSON wtih all colors in UI
// UiThemes - JSON wtih all themes in UI

app.use(MediacubeUi, {
  drawerComponents: {},
  modalComponents: {},
  toasts?: Partial<IToast>
  defaultAvatar?: string | null,
  router?: null | Router,
  colors?: Record<string, string>,
  themes?: ColorThemes,
  theme?: Themes,
})
```

## Svg icons 
For quick access to the icon sprite, it must be embedded directly into the markup, in the body tag

```vue
import mediacubeUiIconsSprite from 'mediacube-ui-v2/sprite?raw'

...
<span v-html="mediacubeUiIconsSprite" id="ui-svg-sprite" />
...

```

If you use **McTopBar** (language dropdown with flags), also embed the flags sprite:

```vue
import mediacubeUiIconsSprite from 'mediacube-ui-v2/sprite?raw'
import mediacubeUiIconsSpriteFlags from 'mediacube-ui-v2/iconsSpriteFlags.svg?raw'

...
<span v-html="mediacubeUiIconsSprite" id="ui-svg-sprite" />
<span v-html="mediacubeUiIconsSpriteFlags" id="ui-svg-sprite-flags" />
...
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking.


 **SCSS example:**

 ```scss
 /**
  * @tokens
  * @presenter
  */

  $color-purple: #8756FF;
  $font-weight-medium: 500;
  $media-desktop: "(hover: hover) and (pointer: fine)";  
  $media-mobile: "(hover: none) and (pointer: coarse)";
  //and much more...
 ```

 **SVG example:**

 ```html
 <svg
   data-token-name="check"
   width="24px"
   height="24px"
   viewBox="0 0 24 24"
   version="1.1"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
 >
   <path
     d="M9.35221912,16.3536125 L19.5004166,5.34255149 C19.9029667,4.90884428 20.5808871,4.88358644 21.0145944,5.28613652 C21.4483016,5.6886866 21.4735594,6.36660707 21.0710093,6.80031428 L10.1375155,18.6574532 C9.71359736,19.1141823 8.99084087,19.1141823 8.56692275,18.6574532 L3.28613652,12.890538 C2.88358644,12.4568308 2.90884428,11.7789103 3.34255149,11.3763602 C3.77625869,10.9738101 4.45417917,10.999068 4.85672925,11.4327752 L9.35221912,16.3536125 Z"
     fill="currentColor"
   ></path>
 </svg>
 ```

 Make sure to specify the `data-token-name` attribute.

## Variables
Variables used to build DS styles. Available for use in your project

For global use:
```scss
@use mediacube-ui-v2/variables as *;
```

### For each component use tokens

```scss
//For example
<style lang="scss">
@use 'mediacube-ui-v2/tokens/colors' as colors;

.class-name {
  &__background {
    background: colors.$color-red;
  }
}
</style>
```

The following tokens are available:

   - animations
   - border-radius
   - box-shadows
   - colors
   - durations
   - easings
   - font-families
   - font-sizes
   - font-weights
   - gradients
   - letter-spacing
   - line-height
   - media-queries
   - opacities
   - sizes
   - spacings
   - z-indexes


### For each component use style helpers

```scss
//For example
<style lang="scss">
@use 'mediacube-ui-v2/styles/mixins' as mixins;
@use 'mediacube-ui-v2/tokens/spacings' as spacings;

.class-name {
  &__inner {
    @include mixins.child-indent-bottom(spacings.$space-200);
  }
}
</style>
```

The following style files are available:

- functions
- mixins 
- spacing 
- toast 

## Документация для ИИ (ai-catalog) и MCP

После `npm run build` в пакет попадает машиночитаемый каталог всех Vue-компонентов: `dist/ai-catalog/index.json` (поле `libraryVersion` совпадает с версией пакета). Поле **`catalogSchemaVersion`** отражает формат JSON (типы, `storyHints`, гайд); при его смене обновите клиенты MCP/скрипты, которые парсят каталог.

### Где взять JSON

- **Локально после установки:** `node_modules/mediacube-ui-v2/dist/ai-catalog/index.json`
- **Через exports:** зарезервирован путь `mediacube-ui-v2/ai-catalog.json` (указывает на тот же файл в опубликованном пакете).
- **По сети (CDN), подставьте версию:**  
  - `https://unpkg.com/mediacube-ui-v2@<version>/dist/ai-catalog/index.json`  
  - `https://cdn.jsdelivr.net/npm/mediacube-ui-v2@<version>/dist/ai-catalog/index.json`  

Шаблоны также перечислены в `package.json` → `aiCatalog`.

### Скрипты в репозитории библиотеки

- `npm run build:ai-catalog` — только генерация каталога в `dist/ai-catalog/`
- `npm run verify:ai-catalog` — генерация + проверка полноты, Storybook-сторис и обязательных `*.ai.md` для сложных компонентов
- `npm run mcp:ui` — MCP-сервер (stdio): `list_components`, `search_ui`, `get_component`, `list_types`, `get_type`, `get_ai_guide` и ресурсы `mediacube-ui://component/...`

Переменные окружения для MCP: `MEDIACUBE_UI_CATALOG_PATH` (путь к `index.json`), `MEDIACUBE_UI_CATALOG_URL` (URL каталога), опционально `MEDIACUBE_UI_TYPES_ROOT` (корень `dist/ai-catalog`, если каталог загружен по URL без локальных `types/` и `FOR_AI.md`).

### Пример `mcp.json` (Cursor)

```json
{
  "mcpServers": {
    "mediacube-ui": {
      "command": "node",
      "args": ["/absolute/path/to/mediacube-ui-v2/scripts/mcp-ui-server.mjs"],
      "env": {}
    }
  }
}
```

В проекте-потребителе с установленным `mediacube-ui-v2` можно не задавать `env`, если каталог резолвится через `require.resolve('mediacube-ui-v2/ai-catalog.json')` из корня потребителя.

## Storybook interface support

![info image storybook interface](./dist/npm_preview.jpg)

[//]: # (## Available Types)
[//]: # (&mdash;)
[//]: # ()
[//]: # (## Available style tokens)
[//]: # (&mdash;)