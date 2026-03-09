<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M15.5001 11L12.0001 14.5L8.50009 11M12.0001 4V14M19.9443 16.5C19.9443 17.4431 19.6254 18.2916 18.9586 18.9585C18.2917 19.6254 17.3872 20 16.4441 20H7.55609C6.61298 20 5.7085 19.6254 5.04162 18.9585C4.37474 18.2916 3.94434 17.4431 3.94434 16.5" stroke="currentColor" fill="none"  stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
