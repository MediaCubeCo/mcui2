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
    <defs><component :is="'style'">.a{}.b{}.c{fill:none;}</component><clipPath :id="uid + '-a'"><rect width="24" height="24" transform="translate(8 8)"/></clipPath></defs><g transform="translate(-8 -8)"><g transform="translate(8 8)"><path class="c" d="M0,0H24V24H0Z"/><path class="a" d="M21,18v1a2.006,2.006,0,0,1-2,2H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H19a2.006,2.006,0,0,1,2,2V6H12a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2Zm-9-2H22V8H12Zm4-2.5A1.5,1.5,0,1,1,17.5,12,1.5,1.5,0,0,1,16,13.5Z"/></g></g>
  </McIconShell>
</template>
