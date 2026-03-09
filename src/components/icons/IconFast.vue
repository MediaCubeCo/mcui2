<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M10 2H14" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 10L12 13" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.0002 5L17.6602 7.34" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 4L21 6" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 15H8" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 18H5" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 21H7" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4.26758 11C5.15558 7.552 8.27358 5 11.9996 5C16.4176 5 19.9996 8.582 19.9996 13C19.9996 17.418 16.4176 21 11.9996 21" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
