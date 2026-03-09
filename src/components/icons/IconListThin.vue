<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M8.5 6H20.5M3.5 6H4.5M3.5 12H4.5M3.5 18H4.5M8.5 12H20.5M8.5 18H20.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
