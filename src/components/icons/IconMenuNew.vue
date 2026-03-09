<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M3 6H21M17 12H3M3 18H13" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
