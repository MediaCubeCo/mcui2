<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <g>
    	<path d="M13.8,9L13.8,9l0-2.4h5.6V2.9H4.1v3.7h5.6V9c-4.5,0.2-8,1.1-8,2.2s3.4,2,8,2.2v7.8h4v-7.8c4.5-0.2,7.9-1.1,7.9-2.2
    		S18.3,9.3,13.8,9z M13.8,12.7c-0.1,0-0.7,0-2,0c-1,0-1.8,0-2,0v0c-4-0.2-7-0.9-7-1.7c0-0.8,3-1.5,7-1.7v2.7c0.3,0,1,0.1,2.1,0.1
    		c1.2,0,1.9-0.1,2-0.1V9.3c4,0.2,7,0.9,7,1.7C20.8,11.9,17.8,12.6,13.8,12.7z"/>
    </g>
  </McIconShell>
</template>
