<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M3 9H21M12 15.1818H6.85714M18 19H6C4.343 19 3 17.657 3 16V8C3 6.343 4.343 5 6 5H18C19.657 5 21 6.343 21 8V16C21 17.657 19.657 19 18 19Z" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
