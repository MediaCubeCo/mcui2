<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { useId } from 'vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
const uid = useId()
function getUrl(id: string) {
  return `url(#${uid}-${id})`
}
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path fill="none" d="M0,0h24v24H0V0z"/>
    <g :id="uid + '-layer1'" transform="translate(-53.895874,-165.87389)">
    	<g :id="uid + '-g3187'" transform="translate(0.13229185,-0.13228321)">
    		<g :id="uid + '-g2666'" transform="matrix(0.35277777,0,0,-0.35277777,67.246115,167.62408)">
    			<path :id="uid + '-path2668'" d="M-27-10.1c0.2-3.9,3.5-19,3.5-19c1.3-3.1,2.3,0,2.3,0c4.1,12.4-4.3,19.5-4.3,19.5
    				C-27.5-8.3-27-10.1-27-10.1 M21.9-7.9c0,0,4.1-2.9,0-3.4c0,0-15.4-1.8-26.8-12.5c0,0-17.2-15-23.6-31.5c0,0-2.1,0-1.4,3.3
    				c0.7,3.3,5,17.4,24.2,34.7C-5.8-17.4,12.6-0.6,21.9-7.9"/>
    		</g>
    	</g>
    </g>
  </McIconShell>
</template>
