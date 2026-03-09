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
    <defs><component :is="'style'">.a,.a{}.c{fill:none;}</component><clipPath :id="uid + '-a'"><rect class="a" width="24" height="24" transform="translate(708 1508)"/></clipPath></defs><g class="b" transform="translate(-708 -1508)"><g transform="translate(708 1508)"><path class="c" d="M0,0H24V24H0Z"/><path class="d" d="M12,2.02A9.98,9.98,0,1,0,21.98,12,9.982,9.982,0,0,0,12,2.02ZM11.48,20V13.74H8L13,4v6.26h3.35Z"/></g></g>
  </McIconShell>
</template>
