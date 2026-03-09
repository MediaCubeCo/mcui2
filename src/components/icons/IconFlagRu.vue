<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M0.5 4.5H23.5V19.5H0.5V4.5Z" fill="#F5F5F5" stroke="#C7CCD1"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 9.15625H23V18.5312H1V9.15625Z" fill="#0039A6"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 14H23V19H1V14Z" fill="#D52B1E"/>
  </McIconShell>
</template>
