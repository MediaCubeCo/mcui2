<script setup lang="ts">
import { McButton } from '@/components'
import { useModal } from '@/composables'

const modal = useModal()
const asd = () => {
  modal.showModal('asd')
}
</script>

<template>
  <div>
    <mc-button @click="asd">asd</mc-button>
  </div>
</template>

<style lang="scss"></style>
