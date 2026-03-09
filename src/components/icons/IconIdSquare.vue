<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M8 15V9M14.5025 15H11.5V9H14.5025C15.5658 9 16.5 9.9367 16.5 11V13C16.5 14.0633 15.5658 15 14.5025 15ZM18.114 21H5.88693C4.29238 21 3 19.7077 3 18.1132V5.88677C3 4.29231 4.29238 3 5.88693 3H18.1131C19.7076 3 21 4.29231 21 5.88677V18.1123C21.001 19.7077 19.7086 21 18.114 21Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
