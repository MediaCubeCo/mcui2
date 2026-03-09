<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M4 16.5L7 19.5M7 19.5L10 16.5M7 19.5V4.5" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.395 4.5H19.606L15.395 9.5H19.606M20 19.5L17.5 14.5L15 19.5M15.419 18.662H19.581" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
