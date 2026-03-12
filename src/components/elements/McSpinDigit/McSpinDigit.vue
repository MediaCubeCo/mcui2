<script setup lang="ts">
import { ref, onMounted, watch, computed, PropType, nextTick, useId } from 'vue'
import { Colors, ColorTypes } from '@/types/styles/Colors'
import { FontWeights } from '@/types/styles/FontWeights'
import { FontSizes } from '@/types/styles/FontSizes'

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
  },
  parentId: {
    type: String,
    default: null
  }
})
const spin_active = ref<boolean>(false)
const offset = ref<number>(0)
const fallback_id = useId()

const computedSpinClasses = computed(() => {
  return {
    'mc-spin-digit': true,
    'mc-spin-digit--off': !spin_active.value
  }
})

const id = computed(() => {
  return props.parentId ?? fallback_id
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

const preparedEnd = computed(() => {
  return getSimpleNumValue(props.end)
})
const preparedStart = computed(() => {
  return getSimpleNumValue(props.start)
})

const triggerSpin = () => {
  emit('spin-start', props.start)
  // делаем проверку, если duration = 0 то скипаем анимацию
  if (!props.duration) {
    offset.value = preparedEnd.value
    emit('spin-end', preparedEnd.value)
    return
  }

  spin_active.value = true
  nextTick(() => {
    offset.value = preparedEnd.value

    setTimeout(() => {
      spin_active.value = false
      emit('spin-end', preparedEnd.value)
    }, props.duration)
  })
}

const getSimpleNumValue = (number: number) => {
  let prepared_end = number ?? 0
  prepared_end = Math.max(prepared_end, 0)
  prepared_end = Math.min(prepared_end, 9)
  return prepared_end
}

const init = () => {
  spin_active.value = false
  offset.value = preparedStart.value
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(triggerSpin)
  }
}

init()

watch(() => props.end, (newVal, oldVal) => {
  newVal !== oldVal && triggerSpin()
})

</script>

<template>
  <div class="mc-spin-digit-container" :style="containerStyles">
    <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
    <span class="mc-spin-digit-container__target">{{ end }}</span>
    <div :class="computedSpinClasses" :style="digitStyles">
      <span v-for="(_, i) in 10" :key="`mc-spin-digit-${id}-${i}`" class="mc-spin-digit__digit">
        {{ i }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
