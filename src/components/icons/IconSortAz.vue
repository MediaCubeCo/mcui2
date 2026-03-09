<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M15.395 14.5H19.606L17.5005 17L15.395 19.5H19.606M20 9.5L17.5 4.5L15 9.5M15.419 8.662H19.581" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 16.5L7 19.5M7 19.5L10 16.5M7 19.5V4.5" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
