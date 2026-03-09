<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 24 24'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#CEB549" stroke="none"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5274 9.57518C16.5272 6.55882 14.0546 6 14.0546 6H7.00011L7.02732 9.07241H8.43223V15.9331H7V19H13.8593C15.5124 19 16.8376 17.06 16.8376 17.06C18.9597 13.5429 17.5273 9.57518 17.5273 9.57518H17.5274ZM13.8961 14.993C13.8961 14.993 13.3581 15.8995 12.7727 15.8995H11.6017L11.5739 9.07993H13.0767C13.0767 9.07993 13.773 9.24994 14.2595 10.859C14.2595 10.859 14.9044 13.1628 13.8961 14.993Z" fill="white" stroke="none"/>
  </McIconShell>
</template>
