<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { useId } from 'vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 676 781'
const props = defineProps({ ...mcSvgIconStandaloneProps })
const uid = useId()
function getUrl(id: string) {
  return `url(#${uid}-${id})`
}
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <defs><path :id="uid + '-kndia'" d="M863.5 345.58l337.44-194.88v243.79L863.51 589.36z"/><path :id="uid + '-kndib'" d="M1538.76 345.58l-211.18 121.7-337.82-194.5 211.18-122.08z"/><path :id="uid + '-kndic'" d="M1538.76 735.33l-337.82 194.88-211.18-122.08 549-316.2z"/><path :id="uid + '-kndid'" d="M863.5 735.33l337.44 194.88v-243.4L863.51 491.92z"/><path :id="uid + '-kndie'" d="M1139.9 429.75L989.76 272.78l211.18 121.7z"/></defs><g><g transform="translate(-863 -150)"><use fill="#ed1d2b" xlink:href="#kndia"/></g><g transform="translate(-863 -150)"><use fill="#ed1d2b" xlink:href="#kndib"/></g><g transform="translate(-863 -150)"><use fill="#ed1d2b" xlink:href="#kndic"/></g><g transform="translate(-863 -150)"><use fill="#c62127" xlink:href="#kndid"/></g><g transform="translate(-863 -150)"><use fill="#c62127" xlink:href="#kndie"/></g></g>
  </McIconShell>
</template>
