<script setup lang="ts">
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import { ref } from 'vue'
const value = ref(0)

</script>

<template>
  <div>
    <mc-field-text v-model="value" name="test" type="num" allow-negative />
  </div>
</template>

<style lang="scss"></style>
