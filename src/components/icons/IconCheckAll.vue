<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M13.623 16.3119H18.123" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.37402 15.8818L6.6186 17L9.12402 14.75" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.623 9.56194H18.123" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.37402 9.13175L6.6186 10.25L9.12402 8" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
