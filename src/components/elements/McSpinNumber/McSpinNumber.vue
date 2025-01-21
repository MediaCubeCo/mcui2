<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { FontSizes } from '@/types/styles/FontSizes'
import { Colors, ColorTypes } from '@/types'
import McSpinDigit from '@/components/elements/McSpinDigit/McSpinDigit.vue'

export type FontSizesUnion = keyof typeof FontSizes

const props = defineProps({
  start: {
    type: [Number, String] as PropType<number | string>,
    required: true
  },
  end: {
    type: [Number, String] as PropType<number | string>,
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
  }
})

const current_from = ref<number | null>(null)

const currentTo = computed((): (string | number)[] => {
  // @ts-ignore
  return String(props.end).split('').map(v => isNaN(v) ? v : +v)
})
const currentFrom = computed((): (string | number)[] => {
  const from = `000000000${String((current_from.value ?? props.start) || 0)}`.substr(-currentTo.value.length)
  // @ts-ignore
  return from.split('').map(v => isNaN(v) ? v : +v)
})

const nonDigitStyles = computed((): { [key: string]: string } => {
  return {
    '--font-size': FontSizes[props.fontSize],
    '--font-color': Colors[props.color]
  }
})

const actualizeNumbers = (): void => {
  current_from.value = props.end as number
}
</script>

<template>
  <div class="mc-spin-number-container">
    <div v-for="(digit, i) in currentTo" :key="`mc-spin-number-${i}-${props.end}`" class="mc-spin-number">
      <template v-if="isNaN(digit as number)">
        <span :style="nonDigitStyles" class="mc-spin-number__non-digit">
        {{ currentTo[i] }}
      </span>
      </template>
      <mc-spin-digit
        v-else
        :end="+currentTo[i]"
        :start="+currentFrom[i]"
        :duration="props.duration"
        :font-size="props.fontSize"
        :color="props.color"
        class="mc-spin-number__digit"
        @spin-end="actualizeNumbers"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/colors' as *;
.mc-spin-number {
  &-container {
    display: flex;
  }
  &__non-digit {
    font-size: var(--font-size);
    color: var(--font-color);
    line-height: 1;
  }
}
</style>
