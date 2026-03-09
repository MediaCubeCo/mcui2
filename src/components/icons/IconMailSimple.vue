<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M7 8.98376L11.2046 10.817C11.4558 10.9265 11.7269 10.9833 12.0009 10.9837C12.275 10.9841 12.5462 10.9282 12.7978 10.8194L17 9.00238M7 4.5H17C19.2091 4.5 21 6.29086 21 8.5V15.5C21 17.7091 19.2091 19.5 17 19.5H7C4.79086 19.5 3 17.7091 3 15.5V8.5C3 6.29086 4.79086 4.5 7 4.5Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
