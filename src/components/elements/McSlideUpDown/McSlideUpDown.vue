<script setup lang="ts">
import { computed, nextTick, onMounted, type PropType, ref, useId, watch } from 'vue'

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

const key = useId()
const open = ref<boolean>(props.active)
const is_hydrated = ref(false)
const animation_in_progress = ref<boolean>(false)
const animation = ref<Animation | null>(null)
const container = ref<HTMLDivElement>()

const classes = computed(() => {
  return {
    'mc-slide-up-down': true,
    'mc-slide-up-down--server-open': !is_hydrated.value && open.value,
    'mc-slide-up-down--server-close': !is_hydrated.value && !open.value,
  }
})

const parseHeightPx = (el: HTMLElement): number => {
  const h = getComputedStyle(el).height
  if (h === 'auto' || h === '') return el.offsetHeight
  return parseFloat(h) || 0
}

const init = (): void => {
  if (!container.value) return
  const el = container.value as HTMLElement
  if (open.value) {
    el.style.height = 'auto'
  } else {
    el.style.height = '0'
  }
}

const runAnimationTo = (targetOpen: boolean): void => {
  const el = container.value as HTMLElement | null
  if (!el) {
    open.value = targetOpen
    return
  }

  if (animation.value) {
    animation.value.cancel()
    animation.value = null
  }

  const targetHeight = targetOpen ? el.scrollHeight : 0
  const currentHeight = parseHeightPx(el)

  if (Math.abs(currentHeight - targetHeight) < 2) {
    open.value = targetOpen
    animation_in_progress.value = false
    el.style.height = targetOpen ? 'auto' : '0'
    return
  }

  animation_in_progress.value = true
  if (targetOpen) {
    emit('slide-open-start', open.value)
  } else {
    emit('slide-close-start', open.value)
  }

  animation.value = el.animate(
    [{ height: `${currentHeight}px` }, { height: `${targetHeight}px` }],
    { duration: props.duration, easing: props.type, fill: 'forwards' }
  )

  animation.value.onfinish = () => {
    open.value = props.active
    animation_in_progress.value = false
    if (container.value) {
      const containerEl = container.value as HTMLElement
      containerEl.style.height = open.value ? 'auto' : '0'
    }
    if (targetOpen) {
      emit('slide-open-end', open.value)
    } else {
      emit('slide-close-end', open.value)
    }
  }
}

onMounted(() => {
  nextTick(() => {
    is_hydrated.value = true
  })
})

watch(
  () => props.active,
  (): void => {
    runAnimationTo(props.active)
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
  <component ref="container" :is="props.tag" :class="classes" :key="`mc-slide-up-down-key-${key}`">
    <slot />
  </component>
</template>

<style lang="scss" src="./index.scss"></style>
