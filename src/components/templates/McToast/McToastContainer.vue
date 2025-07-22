<script setup lang="ts">
import McToast from '@/components/templates/McToast/McToast.vue'
import { ToastPositions } from '@/enums/Toast'
import { computed, PropType } from 'vue'
import { IToast } from '@/types'

const props = defineProps({
  reactiveProps: {
    type: Object as PropType<{ toasts: IToast[] }>,
    default: () => ({
      toasts: []
    })
  }
})

const topLeft = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.TopLeft).reverse()
})
const topCenter = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.TopCenter).reverse()
})
const topRight = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.TopRight).reverse()
})
const bottomLeft = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.BottomLeft)
})
const bottomCenter = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.BottomCenter)
})
const bottomRight = computed(() => {
  return props.reactiveProps.toasts.filter((t: IToast) => t.position === ToastPositions.BottomRight)
})
const handleCloseToastByCloseButton = (toast: IToast) => {
  toast.close()
}
</script>

<template>
  <div class="mc-toasts-container">
    <div v-if="topLeft.length" class="mc-toasts-container__top mc-toasts-container__top--left">
      <mc-toast v-for="toast in topLeft" :key="toast.id" v-bind="toast" :toast="toast" @closed="handleCloseToastByCloseButton(toast)" />
    </div>
    <div v-if="topCenter.length" class="mc-toasts-container__top mc-toasts-container__top--center">
      <mc-toast
        v-for="toast in topCenter"
        :key="toast.id"
        v-bind="toast"
        :toast="toast"
        @closed="handleCloseToastByCloseButton(toast)"
      />
    </div>
    <div v-if="topRight.length" class="mc-toasts-container__top mc-toasts-container__top--right">
      <mc-toast
        v-for="toast in topRight"
        :key="toast.id"
        v-bind="toast"
        :toast="toast"
        @closed="handleCloseToastByCloseButton(toast)"
      />
    </div>
    <div v-if="bottomLeft.length" class="mc-toasts-container__bottom mc-toasts-container__bottom--left">
      <mc-toast
        v-for="toast in bottomLeft"
        :key="toast.id"
        v-bind="toast"
        :toast="toast"
        @closed="handleCloseToastByCloseButton(toast)"
      />
    </div>
    <div v-if="bottomCenter.length" class="mc-toasts-container__bottom mc-toasts-container__bottom--center">
      <mc-toast
        v-for="toast in bottomCenter"
        :key="toast.id"
        v-bind="toast"
        :toast="toast"
        @closed="handleCloseToastByCloseButton(toast)"
      />
    </div>
    <div v-if="bottomRight.length" class="mc-toasts-container__bottom mc-toasts-container__bottom--right">
      <mc-toast
        v-for="toast in bottomRight"
        :key="toast.id"
        v-bind="toast"
        :toast="toast"
        @closed="handleCloseToastByCloseButton(toast)"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/z-indexes' as *;
@use '../../../assets/styles/mixins' as *;

.mc-toasts-container {
  $top-bottom-indent: #{$space-500};
  $left-right-indent: #{$space-200};
  &__top {
    position: fixed;
    top: $top-bottom-indent;
    z-index: $z-index-toasted-container;
    @include child-indent-bottom($space-200);
    &--left {
      left: $left-right-indent;
    }
    &--center {
      left: 50%;
      transform: translateX(-50%);
    }
    &--right {
      right: $left-right-indent;
    }
  }
  &__bottom {
    position: fixed;
    bottom: $top-bottom-indent;
    z-index: $z-index-toasted-container;
    @include child-indent-bottom($space-200);
    &--left {
      left: $left-right-indent;
    }
    &--center {
      left: 50%;
      transform: translateX(-50%);
    }
    &--right {
      right: $left-right-indent;
    }
  }
}
</style>
