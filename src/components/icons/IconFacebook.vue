<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 32 33'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M18.1 28.5V17.6H21.8L22.4 13.3H18.2V10.6C18.1 9.3 18.4 8.5 20.2 8.5H22.5V4.7C22 4.6 20.7 4.5 19.1 4.5C15.8 4.5 13.6 6.5 13.6 10.1V13.2H10V17.5H13.7V28.5H18.1Z" fill="currentColor" />
  </McIconShell>
</template>
