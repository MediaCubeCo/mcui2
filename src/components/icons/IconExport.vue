<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M8 9H6C4.895 9 4 9.895 4 11V18C4 19.105 4.895 20 6 20H18C19.105 20 20 19.105 20 18V11C20 9.895 19.105 9 18 9H16M12 2V13M12 2L9.001 5M12 2L15 5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
