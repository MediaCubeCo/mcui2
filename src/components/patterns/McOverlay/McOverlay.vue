<script setup lang="ts">
import type { ColorTypes } from '@/types/styles/Colors'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  size: {
    type: String as () => SizeTypes,
    default: '500'
  },
  backgroundColor: {
    type: String as () => ColorTypes,
  }
})

const theme = useTheme('overlay')

const computedBackground = computed((): ColorTypes => {
  return props.backgroundColor || theme.component.bg as ColorTypes
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-overlay-color': computedBackground.value && theme.colors[computedBackground.value],
    '--mc-overlay-border-color': theme.colors[theme.component.border as ColorTypes],
    '--mc-overlay-spinner-size': props.size && Sizes[props.size]
  }
})
</script>

<template>
  <section ref="overlay" class="mc-overlay" :style="styles">
    <div class="mc-overlay__background" />
    <section class="mc-overlay__spinner" />
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
