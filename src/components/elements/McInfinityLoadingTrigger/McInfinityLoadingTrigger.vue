<script setup lang="ts">
import { onMounted, watch, ref, onBeforeUnmount, nextTick } from 'vue'

const emit = defineEmits(['loading', 'hide'])
const props = defineProps({
  /**
   * За какое расстояние(px) инициировать loading event
   * **/
  overlap: {
    type: Number,
    default: 100,
  },
  /**
   * Активен ли триггер
   * */
  active: {
    type: Boolean,
    default: false,
  },
  /**
   * Компонент в котором происходит скролл, указывается для большей точности
   * Дефолтно используется область видимости браузера для отслеживания появления компопнента
   * **/
  root: {
    type: String,
    default: null,
  },
})
const observer =  ref<IntersectionObserver | null>()
const el =  ref<HTMLElement | null>()
const infinity_loading_ref = ref<HTMLElement | null>()

onMounted(() => {
  setObserver()
})

onBeforeUnmount(() => {
  clearAllListeners()
})

const setObserver = (): void => {
  el.value = infinity_loading_ref.value
  // создаем IntersectionObserver - смотрит за тем когда элемент попадает во viewport
  observer.value = new IntersectionObserver(
    ([entry]) => {
      // если попадает во viewport делаем $emit
      if ((entry.intersectionRatio === 1 || entry.isIntersecting) && props.active) {
        return emit('loading')
      } else {
        return emit('hide')
      }
    },
    {
      ...(props.root ? { root: el.value?.closest(props.root) } : {}),
      rootMargin: `${props.overlap}px`,
      threshold: 0.1,
    },
  )
  // назначаем слушателя на observer
  el.value && observer.value.observe(el.value)
}

const clearAllListeners = (): void => {
  observer.value && observer.value.disconnect()
  observer.value = null
}

watch(() => props.active, (value): void => {
  clearAllListeners()
  if (value) {
    nextTick(() => setObserver())
  }
})
</script>

<template>
  <section class="el-infinity-loading__wrapper">
    <div ref="infinity_loading_ref" class="el-infinity-loading"></div>
  </section>
</template>

<style lang="scss">
.el-infinity-loading {
  $block-name: &;
  height: 1px;
  width: 100%;
  z-index: 999999;
  user-select: none;
  pointer-events: none;
  background-color: transparent;
  &__wrapper {
    position: relative;
  }
}
</style>
