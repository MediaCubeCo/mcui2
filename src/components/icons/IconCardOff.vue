<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M3 8H21" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 12H7" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 18H6C5.20435 18 4.44129 17.6839 3.87868 17.1213C3.31607 16.5587 3 15.7956 3 15V7C3 6.20435 3.31607 5.44129 3.87868 4.87868C4.44129 4.31607 5.20435 4 6 4H18C18.7956 4 19.5587 4.31607 20.1213 4.87868C20.6839 5.44129 21 6.20435 21 7V12" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 17L20 20" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 17L17 20" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
