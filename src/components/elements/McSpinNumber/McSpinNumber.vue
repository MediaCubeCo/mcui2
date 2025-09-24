<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { ColorTypes, FontWeights, FontSizes } from '@/types'
import McSpinDigit from '@/components/elements/McSpinDigit/McSpinDigit.vue'
import { useTheme } from '@/composables/useTheme'

export type FontSizesUnion = keyof typeof FontSizes
export type FontWeightUnion = keyof typeof FontWeights

const dateNow = Date.now()
const id = ref(String(dateNow))

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
  },
  weight: {
    type: String as () => FontWeightUnion,
    default: 'normal'
  }
})

const theme = useTheme('spinNumber')

const current_from = ref<number | null>(null)

const computedColor = computed((): ColorTypes => {
  return props.color || theme.component.color as ColorTypes
})
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
    '--mc-spin-number-font-size': FontSizes[props.fontSize],
    '--mc-spin-number-font-color': theme.colors[computedColor.value]
  }
})

const actualizeNumbers = (): void => {
  current_from.value = props.end as number
}
</script>

<template>
  <div class="mc-spin-number-container" :id="id">
    <div v-for="(digit, i) in currentTo" :key="`mc-spin-number-${id}-${i}-${props.end}`" class="mc-spin-number">
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
        :weight="props.weight"
        :color="computedColor"
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
    font-size: var(--mc-spin-number-font-size);
    color: var(--mc-spin-number-font-color);
    line-height: 1;
  }
}
</style>
