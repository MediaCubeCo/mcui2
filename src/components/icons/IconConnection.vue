<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M20.053 16C18.58 18.961 15.532 21 12 21C8.468 21 5.42 18.961 3.947 16M20.053 8C18.58 5.039 15.532 3 12 3C8.468 3 5.42 5.039 3.947 8M10 12H3M8 10L10 12L8 14M14 12H21M16 14L14 12L16 10" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
