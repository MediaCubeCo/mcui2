<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path fill="none" d="M0,0h24v24H0V0z"/>
    <path d="M19.3,6.6c0,0-1.4-1.5-4.6-1.7v0.5c0,0,1.8-0.1,3.9,2c-1.6-1.2-4-1.9-6.6-1.9S7,6.2,5.4,7.4c2.2-2.1,3.9-2,3.9-2V4.9
    	C6.1,5.1,4.7,6.6,4.7,6.6c-2.4,3.1-2.6,10-2.6,10c2.3,2.8,5.2,2.4,5.2,2.4l1.1-1.5c-1.4-0.4-2.3-1.2-2.9-1.9c1.6,1.2,4,1.9,6.5,1.9
    	s4.9-0.7,6.5-1.9c-0.6,0.7-1.6,1.5-2.9,1.9l1.1,1.5c0,0,2.9,0.4,5.2-2.4C21.9,16.7,21.7,9.8,19.3,6.6z M8.9,14.7
    	c-0.9,0-1.7-0.8-1.7-1.8s0.7-1.8,1.7-1.8c0.9,0,1.7,0.8,1.7,1.8S9.9,14.7,8.9,14.7z M15.1,14.7c-0.9,0-1.7-0.8-1.7-1.8
    	s0.7-1.8,1.7-1.8s1.7,0.8,1.7,1.8S16,14.7,15.1,14.7z"/>
  </McIconShell>
</template>
