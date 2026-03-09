<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M20.0004 5H4.11035" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 9H4" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.0004 13H4.11035" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 17H4" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 14V20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 17H21" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
