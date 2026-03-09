<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M20 12.01L4 12.01M10.3904 6L4.00748 12L10.3904 18" stroke="currentColor" fill="none"  transform="rotate(180 12 12)" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
