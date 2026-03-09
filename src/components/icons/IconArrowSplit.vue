<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M18 18.979L20 16.979L18 14.979" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 8L20 6L18 4" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.8184 14L14.3984 16.172C14.7764 16.692 15.3814 16.998 16.0244 16.996L20.0004 16.979" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 6.021L16.024 6.004C15.381 6.001 14.776 6.308 14.398 6.828L12.1981 9.85277C11.4453 10.8877 10.2429 11.5 8.96317 11.5H3.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
