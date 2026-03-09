<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 16 16'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M2 9.77783L2 6.4445" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M10 9.77783V6.4445" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M4.66675 11.3335L4.66675 4.88905" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12.6667 11.3335V4.88905" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M7.33325 14.2222L7.33325 1.99995" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </McIconShell>
</template>
