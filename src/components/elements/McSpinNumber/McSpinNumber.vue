<script setup lang="ts">
import { ref, computed, PropType, useId, defineAsyncComponent } from 'vue'
import { ColorTypes } from '@/types/styles/Colors'
import { FontWeights } from '@/types/styles/FontWeights'
import { FontSizes } from '@/types/styles/FontSizes'
import { useTheme } from '@/composables/useTheme'
const McSpinDigit = defineAsyncComponent(() => import('@/components/elements/McSpinDigit/McSpinDigit.vue'))

export type FontSizesUnion = keyof typeof FontSizes
export type FontWeightUnion = keyof typeof FontWeights

const id = useId()

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
    type: String as () => ColorTypes
  },
  weight: {
    type: String as () => FontWeightUnion,
    default: 'normal'
  }
})

const theme = useTheme('spinNumber')

const current_from = ref<string | null>(null)

const computedColor = computed((): ColorTypes => {
  return props.color || (theme.component.color as ColorTypes)
})
const currentTo = computed((): (string | number)[] => {
  // @ts-ignore
  return String(props.end ?? 0).split('').map((v) => (/^\s$/.test(v) ? v : isNaN(v) ? v : +v))
})
const currentFrom = computed((): (string | number)[] => {
  const from = `000000000${String((current_from.value ?? props.start) || 0)}`.slice(-currentTo.value.length)
  // @ts-ignore
  return formatNumber(from)
})

const containerStyle = computed((): { [key: string]: string } => {
  return {
    '--mc-spin-number-container-font-size': FontSizes[props.fontSize],
  }
})
const nonDigitStyles = computed((): { [key: string]: string } => {
  return {
    '--mc-spin-number-font-size': FontSizes[props.fontSize],
    '--mc-spin-number-font-color': theme.colors[computedColor.value],
    '--mc-spin-number-font-weight': FontWeights[props.weight]
  }
})

const formatNumber = (num: number) => {
  return String(num)
    .split('')
    .map((n) => (/^\s$/.test(n) ? n : /\d/.test(n) ? +n : n))
}

const actualizeNumbers = (): void => {
  current_from.value = String(props.end ?? 0)
}

const handleCopy = (e: ClipboardEvent) => {
  if (e.clipboardData) {
    e.preventDefault()
    e.clipboardData.setData('text/plain', String(props.end))
  }
}
</script>

<template>
  <div class="mc-spin-number-container" :id="id" :style="containerStyle" @copy="handleCopy">
    <div v-for="(digit, i) in currentTo" :key="`mc-spin-number-${id}-${i}`" class="mc-spin-number">
      <template v-if="!Number.isFinite(digit)">
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
        :parent-id="id"
        class="mc-spin-number__digit"
        @spin-end="actualizeNumbers"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
