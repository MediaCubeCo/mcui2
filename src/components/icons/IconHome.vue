<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M9 17H15M19.842 8.299L13.842 3.632C12.759 2.789 11.242 2.789 10.158 3.632L4.158 8.299C3.427 8.867 3 9.741 3 10.667V18C3 19.657 4.343 21 6 21H18C19.657 21 21 19.657 21 18V10.667C21 9.741 20.573 8.867 19.842 8.299Z" stroke="currentColor" fill="none" stroke-linecap="round"/>
  </McIconShell>
</template>
