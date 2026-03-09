<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path fill="none" d="M0,0h24v24H0V0z"/>
    <path d="M6.3,7.5H21v9.8H6.3V7.5 M13.6,9.9c1.4,0,2.5,1.1,2.5,2.5s-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5S12.3,9.9,13.6,9.9 M9.5,9.1
    	c0,0.9-0.7,1.6-1.6,1.6V14c0.9,0,1.6,0.7,1.6,1.6h8.2c0-0.9,0.7-1.6,1.6-1.6v-3.3c-0.9,0-1.6-0.7-1.6-1.6H9.5 M3,10.7h1.6v8.2h13.1
    	v1.6H3V10.7z"/>
  </McIconShell>
</template>
