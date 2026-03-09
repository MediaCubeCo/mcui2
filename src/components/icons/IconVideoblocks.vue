<script setup lang="ts">
import McIconShell from '../elements/McIconShell/McIconShell.vue'
import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '0 0 108 108'
const props = defineProps({ ...mcSvgIconStandaloneProps })
</script>
<template>
  <McIconShell :view-box="viewBox" v-bind="props">
    <circle fill="#FFE121" cx="54" cy="54" r="54"/>
    <path d="M51.6,25.7v36.4c-10-0.2-18-8.6-17.8-18.6C34,33.7,41.9,25.9,51.6,25.7z"/>
    <path d="M56.4,82.3V45.9c10,0.2,18,8.6,17.8,18.6C74,74.3,66.1,82.1,56.4,82.3z"/>
    <circle cx="65" cy="34.3" r="8.6"/>
    <circle cx="43" cy="73.7" r="8.6"/>
  </McIconShell>
</template>
