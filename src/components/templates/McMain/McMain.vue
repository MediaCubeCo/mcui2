<script setup lang="ts">
import { onBeforeUnmount, onMounted, PropType } from 'vue'
/**
 * Используется для вёрстки основных страниц
 * на проектах
 */

const vhFix = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(() => {
  vhFix()
  window.addEventListener('resize', vhFix)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', vhFix)
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

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
.mc-main {
  $block-name: &;

  position: relative;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  min-height: -webkit-fill-available;
  min-height: -moz-available;
  min-height: stretch;
  @include custom-scroll();
  &__left {
    display: flex;
  }
  &__right {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
  &__content {
    @include position(absolute, 0);
    overflow-y: auto;
    &-wrapper {
      flex: 1 1 auto;
      position: relative;
    }
  }
}
</style>
