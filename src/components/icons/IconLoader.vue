<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M3 12C3 16.9705 7.0295 21 12 21C16.9705 21 21 16.9705 21 12C21 7.0295 16.9705 3 12 3C9.18725 3 6.676 4.29025 5.02575 6.31125" stroke="currentColor" fill="none"  stroke-width="1" stroke-miterlimit="10" stroke-linecap="round"/>
  </McIconShell>
</template>
