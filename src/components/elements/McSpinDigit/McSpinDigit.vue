<script setup lang="ts">
import { ref, onMounted, watch, computed, PropType, nextTick } from 'vue'
import { Colors, ColorTypes, FontWeights, FontSizes } from '@/types'

export type FontSizesUnion = keyof typeof FontSizes
export type FontWeightUnion = keyof typeof FontWeights

const emit = defineEmits<{
  (e: 'spin-start', value: number): void
  (e: 'spin-end', value: number): void
}>()

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
    default: 'black'
  },
  weight: {
    type: String as () => FontWeightUnion,
    default: 'normal'
  }
})
const id = ref<number>(Date.now())
const spin_active = ref<boolean>(false)
const offset = ref<number>(0)

const computedSpinClasses = computed(() => {
  return {
    'mc-spin-digit': true,
    'mc-spin-digit--off': !spin_active.value
  }
})

const digitStyles = computed(() => {
  return {
    transform: `translateY(-${offset.value * 100}%)`
  }
})

const containerStyles = computed(() => {
  return {
    '--mc-spin-digit-font-size': FontSizes[props.fontSize],
    '--mc-spin-digit-font-color': Colors[props.color],
    '--mc-spin-digit-font-weight': FontWeights[props.weight],
    '--mc-spin-duration': `${props.duration}ms`
  }
})

const triggerSpin = () => {
  emit('spin-start', props.start)
  spin_active.value = true
  nextTick(() => {
    offset.value = props.end

    setTimeout(() => {
      spin_active.value = false
      emit('spin-end', props.end)
    }, props.duration)
  })
}

const init = () => {
  spin_active.value = false
  offset.value = props.start
  requestAnimationFrame(triggerSpin)
}

onMounted(() => {
  init()
})

watch(() => props.end, (newVal, oldVal) => {
  newVal !== oldVal && triggerSpin()
})

</script>

<template>
  <div :id="String(id)" class="mc-spin-digit-container" :style="containerStyles">
    <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
    <span class="mc-spin-digit-container__target">{{ end }}</span>
    <div :class="computedSpinClasses" :style="digitStyles">
      <span v-for="n in 10" :key="`${id}-${start}-${end}-${n}`" class="mc-spin-digit__digit">
        {{ (n - 1 + 10) % 10 }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/colors' as *;

.mc-spin-digit-container {
  $block-name: &;
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
    height: 100%;
    color: var(--mc-spin-digit-font-color);
    transition: transform var(--mc-spin-duration) cubic-bezier(0.4, 0, 0.2, 1);
    &--off {
      transition: none;
    }
    &__digit {
      height: var(--mc-spin-digit-font-size);
      line-height: var(--mc-spin-digit-font-size);
      font-size: var(--mc-spin-digit-font-size);
      font-weight: var(--mc-spin-digit-font-weight);
      color: var(--mc-spin-digit-font-color);
      text-align: center;
      flex-shrink: 0;
    }
  }
}
</style>
