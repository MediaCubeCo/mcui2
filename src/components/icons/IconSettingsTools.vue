<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M21 17H17M13 17H3M3 7H7M11 7H21M14 14H16C16.552 14 17 14.448 17 15V19C17 19.552 16.552 20 16 20H14C13.448 20 13 19.552 13 19V15C13 14.448 13.448 14 14 14ZM10 10H8C7.448 10 7 9.552 7 9V5C7 4.448 7.448 4 8 4H10C10.552 4 11 4.448 11 5V9C11 9.552 10.552 10 10 10Z" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
