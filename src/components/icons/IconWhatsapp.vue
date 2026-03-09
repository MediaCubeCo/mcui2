<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path fill="none" d="M0,0h24v24H0V0z"/>
    <g>
    	<g>
    		<path d="M19,5c-1.8-1.8-4.1-2.7-6.6-2.7S7.6,3.2,5.8,5s-2.7,4.1-2.7,6.6c0,1.6,0.4,3.1,1.2,4.5l-2,5.6l5.6-2
    			c1.4,0.8,2.9,1.2,4.5,1.2c2.5,0,4.8-1,6.6-2.7s2.7-4.1,2.7-6.6S20.8,6.8,19,5z M17,15.1L16,16.1c-0.9,0.9-3.4-0.2-5.7-2.4
    			C8.1,11.5,7,8.9,7.9,8.1L8.9,7c0.2-0.2,0.6-0.2,0.8,0l1.3,1.3c0.2,0.2,0.2,0.6,0,0.8l-0.8,0.8c0.8,1.7,2.1,3,3.8,3.8l0.8-0.8
    			c0.2-0.2,0.6-0.2,0.8,0l1.3,1.3C17.3,14.5,17.3,14.8,17,15.1z"/>
    	</g>
    </g>
  </McIconShell>
</template>
