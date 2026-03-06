<script setup lang="ts">
import { onErrorCaptured } from 'vue'
const emit = defineEmits(['error-captured'])

onErrorCaptured((e) => {
  console.error(e)
  emit('error-captured')
})
</script>

<template>
  <slot />
</template>