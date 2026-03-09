<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { useId } from 'vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 28 28'
const props = defineProps({ ...mcSvgIconStandaloneProps })
const uid = useId()
function getUrl(id: string) {
  return `url(#${uid}-${id})`
}
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <defs><clipPath :id="uid + '-a'"><rect width="28" height="28" rx="4" transform="translate(166 310)"/></clipPath></defs><g transform="translate(-166 -310)"><path d="M9.831,21.541V25.5h4.947v3.957h3.957V25.5h1.979a4.947,4.947,0,0,0,0-9.894H12.8a.989.989,0,1,1,0-1.979H23.683V9.669H18.736V5.711H14.778V9.669H12.8a4.947,4.947,0,1,0,0,9.894h7.915a.989.989,0,1,1,0,1.979Z" transform="translate(163.243 306.417)"/></g>
  </McIconShell>
</template>
