<script setup lang="ts">
import { computed, inject, onMounted, type PropType, ref, watch } from 'vue'
import { IDSOptions } from '@/types'

interface animationPayload {
  contentHeight: string | number
}

const emit = defineEmits<{
  (e: 'slide-open-start', value: boolean): void
  (e: 'slide-close-start', value: boolean): void
  (e: 'slide-open-end', value: boolean): void
  (e: 'slide-close-end', value: boolean): void
}>()

const props = defineProps({
  /*
   * Состояние
   */
  active: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /*
   * Продолжительность тоггла
   */
  duration: {
    type: Number as PropType<number>,
    default: 300
  },
  type: {
    type: String as PropType<string>,
    default: 'ease-out'
  },
  /*
   * Если нужен другой тег
   */
  tag: {
    type: String as PropType<string>,
    default: 'div'
  },
  /*
   * Применять ли атрибут hidden
   * к элементы при закрытии
   */
  useHidden: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})
const dsOptions = inject<IDSOptions>('dsOptions', {})

const key = ref(Date.now())
const open = ref<boolean>(props.active)
const animation_in_progress = ref<boolean>(false)
const animation = ref<Animation | null>(null)
const container = ref<HTMLDivElement>()

const isServer = computed(() => {
  return dsOptions?.meta?.isServer
})

const classes = computed(() => {
  return {
    'mc-slide-up-down': true,
    'mc-slide-up-down--server-open': isServer.value && open.value,
    'mc-slide-up-down--server-close': isServer.value && !open.value,
  }
})

const init = (): void => {
  if (container.value && !open.value) {
    container.value.style.height = '0'
  }
}

const animate = (): void => {
  if (!container.value || animation_in_progress.value) return
  animation_in_progress.value = true
  // Получаем фактическую высоту содержимого
  const contentHeight = container.value.scrollHeight

  const payload = {
    contentHeight
  } as animationPayload

  // Отменяем предыдущую анимацию, если она была
  if (animation.value) {
    animation.value.cancel()
  }
  open.value ? handleClose(payload) : handleOpen(payload)
}

const toggleOpenValue = (): void => {
  open.value = !open.value
}

const handleClose = ({ contentHeight }: animationPayload) => {
  emit('slide-close-start', open.value)

  if (container.value) {
    animation.value = container.value.animate([{ height: `${contentHeight}px` }, { height: '0' }], {
      duration: props.duration,
      easing: props.type,
      fill: 'forwards'
    })
    animation.value.onfinish = () => {
      emit('slide-close-end', open.value)
      animation_in_progress.value = false
      toggleOpenValue()
    }
  }
}

const handleOpen = ({ contentHeight }: animationPayload) => {
  emit('slide-open-start', open.value)

  if (container.value) {
    animation.value = container.value.animate([{ height: '0' }, { height: `${contentHeight}px` }], {
      duration: props.duration,
      easing: props.type,
      // fill: 'forwards'
    })

    animation.value.onfinish = () => {
      emit('slide-open-end', open.value)
      animation_in_progress.value = false
      if (container.value) {
        container.value.style.height = 'auto'
      }
      toggleOpenValue()
    }
  }
}

onMounted(() => {
  key.value = Date.now()
})

watch(
  () => props.active,
  (): void => {
    animate()
  }
)
watch(
  () => container.value,
  (): void => {
    init()
  }
)
</script>

<template>
  <component ref="container" :is="props.tag" :class="classes" :key="`mc-slide-up-down-key-${isServer}-${key}`">
    <slot />
  </component>
</template>

<style lang="scss">
@use '../../../assets/tokens/font-families' as *;
.mc-slide-up-down {
  overflow: hidden;
  font-family: $font-family-main;
  &--server {
    &-open {
      height: 100% !important;
    }
    &-close {
      height: 0 !important;
    }
  }
}
</style>
