<script setup lang="ts">
import { useId, inject } from 'vue'
import { useMcSvgIconProps, mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const props = defineProps({
  viewBox: {
    type: String,
    required: true
  },
  ...mcSvgIconStandaloneProps
})

const symbolId = inject<string | null>('mcSvgIconSymbolId', null)
const localId = useId()
const { classes, styles } = useMcSvgIconProps(props)
</script>

<template>
  <symbol v-if="symbolId" :id="symbolId" :viewBox="viewBox">
    <slot />
  </symbol>
  <svg v-else :class="classes" :style="styles">
    <symbol :id="localId" :viewBox="viewBox">
      <slot />
    </symbol>
    <use :href="'#' + localId" />
  </svg>
</template>

<style lang="scss" src="../McSvgIcon/index.scss"></style>
