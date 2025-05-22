<script setup lang="ts">
import { ref, onMounted, watch, computed, PropType } from 'vue'
import { FontSizes } from '@/types/styles/FontSizes'
import { ColorTypes } from '@/types'
import { useTheme } from '@/composables/useTheme'

export type FontSizesUnion = keyof typeof FontSizes

const emit = defineEmits<{
  (e: 'spin-start', value: number): void
  (e: 'spin-end', value: number): void
}>()

const dateNow = Date.now()
const id = ref(String(dateNow))

const props = defineProps({
  /**
   * min - 0, max - 9
   * */
  start: {
    type: Number as PropType<number>,
    required: true
  },
  /**
   * min - 0, max - 9
   * */
  end: {
    type: Number as PropType<number>,
    required: true
  },
  duration: {
    type: Number as PropType<number>,
    default: 500
  },
  fontSize: {
    type: String as () => FontSizesUnion,
    default: '300'
  },
  color: {
    type: String as () => ColorTypes,
  }
})

const theme = useTheme('spinDigit')

const spin_active = ref<boolean>(false)
const offset = ref<number>(0)

const computedColor = computed((): ColorTypes => {
  return props.color || theme.component.color as ColorTypes
})

const containerStyles = computed((): { [key: string]: string } => {
  return {
    '--mc-spin-digit-font-size': FontSizes[props.fontSize],
    '--mc-spin-digit-font-color': theme.colors[computedColor.value]
  }
})

// Анимация барабана
const spinDigit = (): void => {
  spin_active.value = true
  offset.value = props.start
  emit('spin-start', props.start)

  const total_frames = Math.floor((props.duration * 2) / 16)
  let current_frame = 0
  const indent = props.end - props.start

  const animate = (): void => {
    const progress = indent / total_frames

    if (current_frame <= total_frames && spin_active.value) {
      current_frame++
      offset.value = offset.value + progress
      requestAnimationFrame(animate)
    } else {
      offset.value = props.end
      spin_active.value = false
      emit('spin-end', props.end)
    }
  }

  animate()
}
watch(
  () => [props.start, props.end],
  (): void => {
    spin_active.value = false
    setTimeout(() => spinDigit(), 1)
  }
)

onMounted((): void => {
  spinDigit()
})
</script>

<template>
  <div class="mc-spin-digit-container" :style="containerStyles" :id="id">
    <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
    <span class="mc-spin-digit-container__target">{{ props.end }}</span>
    <div class="mc-spin-digit" :style="{ transform: `translateY(${-(offset * 10)}%)` }">
      <span v-for="n in 10" :key="`${id}-${props.start}-${props.end}-${n}`" class="mc-spin-digit__digit">
        {{ (n - 1 + 10) % 10 }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/colors' as *;
.mc-spin-digit-container {
  --mc-spin-digit-font-size: $font-size-300;
  font-family: $font-family-main;
  overflow: hidden;
  height: var(--mc-spin-digit-font-size);
  position: relative;
  &__target {
    font-size: var(--mc-spin-digit-font-size);
    visibility: hidden;
  }
  .mc-spin-digit {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    color: var(--mc-spin-digit-font-color);
    &__digit {
      height: var(--mc-spin-digit-font-size);
      line-height: var(--mc-spin-digit-font-size);
      font-size: var(--mc-spin-digit-font-size);
      color: var(--mc-spin-digit-font-color);
      text-align: center;
    }
  }
}
</style>
