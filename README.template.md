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
```js
//Nuxt plugin
import { defineNuxtPlugin } from '#app';
import MediacubeUi from 'mediacube-ui-v2'
import 'mediacube-ui-v2/style'

export default defineNuxtPlugin( (nuxtApp) => {
  nuxtApp.vueApp.use(MediacubeUi, {
    drawerComponents: {},
    modalComponents: {}
  })
})
```
###  Vue@3.X
```js
import MediacubeUi from 'mediacube-ui-v2'
import 'mediacube-ui-v2/style'

app.use(MediacubeUi, {
  drawerComponents: {},
  modalComponents: {}
})
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking.

 **CSS example:**

 ```css
 /**
  * @tokens Colors
  * @presenter Color
  */

 :root {
   --n0: #fff; /* Token Description */
   --n100: #fbfbfb;
   --n200: #edeeef;
   --n300: #e4e5e7;
   --primary: var(--n300);
 }

 /**
  * @tokens Border Radius
  * @presenter BorderRadius
  */

 :root {
   --border-radius-m: 4px;
   --border-radius-l: 8px;
 }
 ```

 **SCSS example:**

 ```scss
 /**
  * @tokens Colors
  * @presenter Color
  */

 $n0: #fff; /* Token Description */
 $n100: #fbfbfb;
 $n200: #edeeef;
 $n300: #e4e5e7;
 $primary: $n300;

 /**
  * @tokens Border Radius
  * @presenter BorderRadius
  */

 $border-radius-m: 4px;
 $border-radius-l: 8px;
 ```

 **SVG example:**

 ```html
 <?xml version="1.0" encoding="UTF-8"?>
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

 ## Presenters

 Presenters are used to render examples for your design tokens. The following presenters are available:

   - Animation
   - BorderRadius
   - Border
   - Color
   - Easing
   - FontFamily
   - FontSize
   - FontWeight
   - Gradient
   - LineHeight
   - Opacity
   - Shadow
   - Spacing
   - Svg

[//]: # (## Available Types)
[//]: # ({{types}})
[//]: # ()
[//]: # (## Available style tokens)
[//]: # ({{tokens}})