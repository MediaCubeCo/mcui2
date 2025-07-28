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

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
.mc-content-fixed {
  $block-name: &;
  @include position(absolute, 0);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  @include custom-scroll();
  &__top,
  &__mid {
    &:empty {
      display: none;
    }
  }
  &__top {
    flex-shrink: 0;
  }
  &__mid {
    position: relative;
    flex-grow: 1;
    &-inner {
      @include position(absolute, 0);
    }
  }
}
</style>
