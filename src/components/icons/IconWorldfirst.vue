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
    <g :clip-path="getUrl('clip0_10709_44614')">
    <rect width="24" height="24" fill="white"/>
    <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM1.152 12C1.152 17.9912 6.00882 22.848 12 22.848C17.9912 22.848 22.848 17.9912 22.848 12C22.848 6.00882 17.9912 1.152 12 1.152C6.00882 1.152 1.152 6.00882 1.152 12Z" fill="#EDF0F3"/>
    <path d="M8.01724 16.4135L10.9768 8H12.2923L12.5928 9.4011L9.47896 18H8.06597L8.01724 16.4135ZM7.41183 8L8.75622 16.4135L8.59381 18H7.0184L5 8H7.41183ZM15.2438 16.3448L16.5882 8H19L16.9654 17.9657H15.39L15.2438 16.3448ZM13.0313 8L15.9828 16.4135L15.9178 17.9657H14.5048L11.3991 9.39423L11.7239 8H13.0313Z" fill="#FA1D44"/>
    </g>
    <defs>
    <clipPath :id="uid + '-clip0_10709_44614'">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
  </McIconShell>
</template>
