<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M7 12H20M7 16H6C4.895 16 4 15.105 4 14V7C4 5.895 4.895 5 6 5H15C16.105 5 17 5.895 17 7V8M12 16H10M18 19H9C7.895 19 7 18.105 7 17V10C7 8.895 7.895 8 9 8H18C19.105 8 20 8.895 20 10V17C20 18.105 19.105 19 18 19Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
