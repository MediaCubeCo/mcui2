<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M15.436 14.484L21 16.976L11.987 21L3 16.976L8.564 14.491M15.436 9.509L21 12L11.987 16.024L3 12L8.564 9.516M3 7.024L11.987 11.049L21 7.024L12.013 3L3 7.024Z" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
