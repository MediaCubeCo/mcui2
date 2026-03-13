/**
 * Единый источник имён спрайтов иконок. Используется в create-svg-sprite.js и в приложении.
 */
export const SPRITE_IDS = Object.freeze({
  MAIN: 'mc_ui_sprite_main',
  FLAGS: 'mc_ui_sprite_flags',
  GRADS: 'mc_ui_sprite_grads'
})

export const SPRITE_FILES = Object.freeze({
  [SPRITE_IDS.MAIN]: 'iconsSprite.svg',
  [SPRITE_IDS.FLAGS]: 'iconsSpriteFlags.svg',
  [SPRITE_IDS.GRADS]: 'iconsSpriteGrads.svg'
})
