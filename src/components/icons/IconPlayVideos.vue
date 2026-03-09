<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M10.9406 9.05799L14.8226 11.354C15.3136 11.644 15.3136 12.355 14.8226 12.645L10.9406 14.941C10.4406 15.237 9.80859 14.876 9.80859 14.295V9.70399C9.80859 9.12299 10.4406 8.76199 10.9406 9.05799Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
