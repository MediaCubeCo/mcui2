<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <rect width="24" height="24" rx="12" fill="black"/>
    <path d="M13.3333 10.9287L18.5459 5H17.3111L12.7831 10.1468L9.1692 5H5L10.4661 12.7836L5 19H6.2348L11.0135 13.5636L14.8308 19H19M6.68047 5.9111H8.57747L17.3102 18.1336H15.4127" fill="white"/>
  </McIconShell>
</template>
