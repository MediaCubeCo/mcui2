<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path fill="none" d="M0,0h24v24H0V0z"/>
    <path d="M12,1.9c-5.6,0-10.1,4.2-10.1,9.4c0,3,1.5,5.6,3.8,7.3v3.6l3.5-1.9c0.9,0.3,1.9,0.4,2.9,0.4c5.6,0,10.1-4.2,10.1-9.4
    	C22.1,6.1,17.6,1.9,12,1.9z M13,14.5l-2.6-2.8l-5,2.8l5.5-5.9l2.6,2.8l5-2.8L13,14.5z"/>
  </McIconShell>
</template>
