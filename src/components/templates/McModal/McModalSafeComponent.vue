<script setup lang="ts">
import { onErrorCaptured } from 'vue'
const emit = defineEmits(['error-captured'])

onErrorCaptured((e) => {
  console.error(e)
  emit('error-captured')
  return false
})
</script>

<template>
  <slot />
</template>