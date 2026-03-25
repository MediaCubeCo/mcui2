<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
/**
 * Используется для вёрстки основных страниц
 * на проектах
 */

const vhResizeRaf = ref<number | null>(null)

const vhFix = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const vhFixOnResize = () => {
  if (typeof window === 'undefined') return
  if (vhResizeRaf.value != null) cancelAnimationFrame(vhResizeRaf.value)
  vhResizeRaf.value = requestAnimationFrame(() => {
    vhResizeRaf.value = null
    vhFix()
  })
}

onMounted(() => {
  vhFix()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', vhFixOnResize)
  }
})

onBeforeUnmount(() => {
  if (vhResizeRaf.value != null) cancelAnimationFrame(vhResizeRaf.value)
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', vhFixOnResize)
  }
})
</script>

<template>
  <div class="mc-main">
    <div v-if="$slots['left-bar']" class="mc-main__left">
      <!-- @slot Слот сайдбара -->
      <slot name="left-bar" />
    </div>
    <div class="mc-main__right">
      <!-- @slot Слот хедера -->
      <slot name="top-bar" />
      <div class="mc-main__content-wrapper">
        <div class="mc-main__content">
          <!-- @slot Слот контента -->
          <slot />
        </div>
      </div>
      <slot name="bottom" />
    </div>
    <slot name="includes" />
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
