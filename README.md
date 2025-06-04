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

## Storybook interface support

![info image storybook interface](./dist/npm_preview.jpg)

[//]: # (## Available Types)
[//]: # (&mdash;)
[//]: # ()
[//]: # (## Available style tokens)
[//]: # (&mdash;)