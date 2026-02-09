<script setup lang="ts">
import { McButton, McModal } from '@/components'
import { ref } from 'vue'

const qqq = ref(false)
</script>

<template>
  <div>
    <mc-button @click="qqq = !qqq">asd</mc-button>
    {{ qqq }}
    <mc-modal v-model="qqq" />
  </div>
</template>

<style lang="scss"></style>
