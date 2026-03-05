<script setup lang="ts">
import { onErrorCaptured } from 'vue'
const emit = defineEmits(['error-captured'])

onErrorCaptured(() => {
  emit('error-captured')

  setTimeout(() => {
    emit('error-captured')
  })

  return false
})
</script>

<template>
  <slot />
</template>