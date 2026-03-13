import type { Preview } from '@storybook/vue3'

import iconsSprite from '../src/assets/iconsSprite.svg?raw'
import iconsSpriteFlags from '../src/assets/iconsSpriteFlags.svg?raw'
import iconsSpriteGrads from '../src/assets/iconsSpriteGrads.svg?raw'
import { SPRITE_IDS } from '../src/consts/iconsSpriteIds.js'
const sprites = {
  [SPRITE_IDS.MAIN]: iconsSprite,
  [SPRITE_IDS.FLAGS]: iconsSpriteFlags,
  [SPRITE_IDS.GRADS]: iconsSpriteGrads,
}

function injectSprites() {
  if (typeof document === 'undefined') return
  Object.values(SPRITE_IDS).forEach(async id => {
    if (!document.getElementById(id)) {
      const wrap = document.createElement('span')
      wrap.innerHTML = sprites[id]
      document.body.prepend(wrap)
    }
  })
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (story) => {
      injectSprites()
      return story()
    }
  ]
}

export default preview
