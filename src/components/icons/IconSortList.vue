<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { useId } from 'vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 18 18'
const props = defineProps({ ...mcSvgIconStandaloneProps })
const uid = useId()
function getUrl(id: string) {
  return `url(#${uid}-${id})`
}
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <defs><clipPath :id="uid + '-a'"><path class="a" d="M0,0H18V18H0Z"/></clipPath></defs><g class="b"><path class="a" d="M8.78,11.415V9.659H15.8v1.756H8.78m0,5.268V14.927h3.512v1.756H8.78m0-10.537V4.39H19.317V6.146H8.78m-3.512,8.78h2.2L4.39,18,1.317,14.927h2.2V3.512H5.268Z" transform="translate(-1.317 -1.756)"/></g>
  </McIconShell>
</template>
