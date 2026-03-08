<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { ColorTypes } from '@/types/styles/Colors'

const props = defineProps({
  center: {
    type: Boolean,
    default: false
  }
})

const theme = useTheme('bottomLoader')

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-bottom-loader': true,
    'mc-bottom-loader--center': props.center
  }
})
const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-bottom-loader-color': theme.colors[theme.component.border as ColorTypes],
  }
})
</script>

<template>
  <section :class="classes" :style="styles">
    <section class="mc-bottom-loader__spinner"></section>
  </section>
</template>

<style lang="scss" src="./index.scss"></style>
