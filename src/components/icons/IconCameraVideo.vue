<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M15 12.9968L19.048 15.7719C19.8331 16.3107 21 15.8346 21 14.9759V9.02413C21 8.16545 19.8331 7.68931 19.048 8.22814L15 11.0032M12.8182 18H5.18182C3.97648 18 3 16.9492 3 15.6522V8.34783C3 7.05078 3.97648 6 5.18182 6H12.8182C14.0235 6 15 7.05078 15 8.34783V15.6522C15 16.9492 14.0235 18 12.8182 18Z" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
