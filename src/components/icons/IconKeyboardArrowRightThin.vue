<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 40 40'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M16.6665 26.6654L23.3332 19.9987L16.6665 13.332" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
