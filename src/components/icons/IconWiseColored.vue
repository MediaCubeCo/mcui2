<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#00B9FF"/>
    <path d="M9.95238 9.91756L7 12.8351H12.019L12.5429 11.5636H10L11.5905 9.91756L10.6667 8.27151H14.981L11 18H12.4952L17 7H8.29524L9.95238 9.91756Z" fill="white"/>
  </McIconShell>
</template>
