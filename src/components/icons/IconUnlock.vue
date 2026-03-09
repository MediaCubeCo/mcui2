<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M13.083 10V7.50001C13.083 5.10701 15.023 3.16701 17.416 3.16701C19.809 3.16701 21.749 5.10701 21.749 7.50001V9.66701M9.29199 14V17M14.292 21H4.29199C3.18699 21 2.29199 20.105 2.29199 19V12C2.29199 10.895 3.18699 10 4.29199 10H14.292C15.397 10 16.292 10.895 16.292 12V19C16.292 20.105 15.397 21 14.292 21Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
