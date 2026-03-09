<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M19 8H15C14.448 8 14 7.552 14 7V3M19 8C19 7.469 18.789 6.789 18.414 6.414L15.586 3.586C15.211 3.211 14.531 3 14 3M19 8V13M14 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H11M15 17L19 21M19 21H15M19 21V17" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
