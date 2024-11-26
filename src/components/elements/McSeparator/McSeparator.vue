<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { Spaces, type SpaceTypes } from '@/types/styles/Spaces'
import type { ColorsUnion } from '@/types/styles/Colors'
import type { SpacesUnion } from '@/types/styles/Spaces'

const props = defineProps({
  /**
   * Толщина `s, m`
   */
  weight: {
    type: String as PropType<'s' | 'm'>,
    default: 's',
  },
  /**
   * Цвет (токены)
   */
  color: {
    type: String as () => ColorTypes,
    default: 'outline-gray',
  },
  /**
   * Отступ слева и справа: 50, 200... ...1000
   */
  indentX: {
    type: String as () => SpaceTypes,
    default: '',
  },
  /**
   * Отступ сверху и снизу: 50, 200... ...1000
   */
  indentY: {
    type: String as () => SpaceTypes,
    default: '',
  },
  /**
   * Отступ сверху: 50, 200... ...1000
   */
  indentTop: {
    type: String as () => SpaceTypes,
    default: '',
  },
  /**
   * Отступ снизу: 50, 200... ...1000
   */
  indentBottom: {
    type: String as () => SpaceTypes,
    default: '',
  },
  /**
   * Отступ слева: 50, 200... ...1000
   */
  indentLeft: {
    type: String as () => SpaceTypes,
    default: '',
  },
  /**
   * Отступ справа: 50, 200... ...1000
   */
  indentRight: {
    type: String as () => SpaceTypes,
    default: '',
  },
})

const indents = computed((): { [key: string]: SpaceTypes } => ({
  top: props.indentTop || props.indentY,
  bottom: props.indentBottom || props.indentY,
  left: props.indentLeft || props.indentX,
  right: props.indentRight || props.indentX,
}))

const classes = computed((): { [key: string]: boolean } => ({
  'mc-separator': true,
}))

const styles = computed((): { [key: string]: ColorsUnion | SpacesUnion | string } => {
  let style = {} as { [key: string]: ColorsUnion | SpacesUnion | string }
  if (props.color) style['--mc-separator-color'] = Colors[props.color]
  if (indents.value.top) style['--mc-separator-indent-top'] = Spaces[indents.value.top]
  if (indents.value.bottom) style['--mc-separator-indent-bottom'] = Spaces[indents.value.bottom]
  if (indents.value.left) style['--mc-separator-indent-left'] = Spaces[indents.value.left]
  if (indents.value.right) style['--mc-separator-indent-right'] = Spaces[indents.value.right]

  let weight: string | undefined
  switch (props.weight) {
    case 's': {
      weight = '1px'
      break
    }
    case 'm': {
      weight = '2px'
    }
  }
  if (weight) style['--mc-separator-weight'] = weight

  return style
})
</script>

<template>
  <div :class="classes" :style="styles">
    <div class="mc-separator__wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
.mc-separator {
  $block-name: &;
  --mc-separator-color: initial;
  --mc-separator-indent-top: initial;
  --mc-separator-indent-bottom: initial;
  --mc-separator-indent-left: initial;
  --mc-separator-indent-right: initial;
  --mc-separator-weight: initial;
  width: 100%;
  margin-top: var(--mc-separator-indent-top);
  margin-bottom: var(--mc-separator-indent-bottom);
  margin-inline-start: var(--mc-separator-indent-left);
  margin-inline-end: var(--mc-separator-indent-right);
  height: var(--mc-separator-weight);
  &__wrapper {
    @include size(100%);
    background-color: var(--mc-separator-color);
  }
}
</style>
