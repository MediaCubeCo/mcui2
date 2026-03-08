<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
  maxHeight: {
    type: Number as PropType<number>,
    default: 300
  }
})

const panelStyles = computed((): { [key: string]: string } => {
  return {
    '--panel-max-height': `${props.maxHeight}px`
  }
})
</script>

<template>
  <section class="mc-dropdown-panel" :style="panelStyles">
    <!-- @slot Слот контента -->
    <slot />
  </section>
</template>

<style lang="scss" src="./McDropdownPanel.scss"></style>
