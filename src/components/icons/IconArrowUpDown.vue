<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M12 3.00002L12.01 21M12 3.00002L7 8M12 3.00002L17 8M12.01 21L7 16M12.01 21L17 16" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
