<script setup lang="ts">
/**
 * Нужен для вписания контента
 * в оставшееся свободное пространство страницы браузера.
 * Чаще всего используется для таблиц.
 */
</script>

<template>
  <div class="mc-content-fixed">
    <div class="mc-content-fixed__top">
      <!-- @slot Слот шапки -->
      <slot name="top" />
    </div>
    <div class="mc-content-fixed__mid">
      <div class="mc-content-fixed__mid-inner">
        <!-- @slot Слот контента -->
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
