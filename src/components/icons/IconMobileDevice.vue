<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M11 6H13M12 17.8984V18M16 21H8C6.895 21 6 20.105 6 19V5C6 3.895 6.895 3 8 3H16C17.105 3 18 3.895 18 5V19C18 20.105 17.105 21 16 21Z" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </McIconShell>
</template>
