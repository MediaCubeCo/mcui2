<script setup lang="ts">
import { computed, onMounted, type PropType } from 'vue'
import type { IconsListUnion } from '@/types/styles/Icons'
import { ColorTypes, IToast, IToastAction, ToastPositionsUnion } from '@/types'
import { ToastPositions } from '@/enums/Toast'
import { McPreview, McSvgIcon, McTitle, McButton } from '@/components'
import { useTimer } from '@/composables/useTimer'
import { ButtonSize, PreviewSizes, Weights } from '@/enums'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  (e: 'closed', value: IToast): void
}>()

const props = defineProps({
  id: {
    type: Number as PropType<number>
  },
  duration: {
    type: Number as PropType<number>,
    default: null
  },
  position: {
    type: String as () => ToastPositionsUnion,
    default: ToastPositions.BottomCenter
  },
  variation: {
    type: String as () => ColorTypes,
  },
  /**
   * иконка
   */
  icon: {
    type: String as () => IconsListUnion,
    default: null
  },
  title: {
    type: String as PropType<string>,
    default: null
  },
  description: {
    type: String as PropType<string>,
    default: null
  },
  /**
   * Нужна ли кнопка
   * закрытия
   */
  closable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Temporary unavailable
   * */
  show_time: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Array of mc-button props
   * */
  actions: {
    type: Array as PropType<IToastAction[]>,
    default: () => []
  },
  /**
   * Technical prop
   * */
  toast: {
    type: Object as () => IToast,
    default: () => ({})
  }
})

const computedVariation = computed((): ColorTypes => {
  return props.variation || theme.component.variation as ColorTypes
})

const theme = useTheme('toast')

const timer = useTimer(props.toast.timeEnd, props.duration)

const toastClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-toast': true,
    [`mc-toast--variation-${computedVariation.value}`]: true
  }
})
const toastStyles = computed((): { [key: string]: string } => {
  return {
    '--mc-toast-background-color': theme.colors[computedVariation.value]
  }
})

const handleClose = (): void => {
  emit('closed', props.toast)
}

const handleCustomButtonAction = (handler: Function) => {
  handler && handler()
  props.toast.destroy()
}

onMounted((): void => {
  timer.start()
})
</script>

<template>
  <div :class="toastClasses" :style="toastStyles" @mouseenter="timer.pause()" @mouseleave="timer.start()">
    <mc-preview :size="PreviewSizes.L">
      <template v-if="props.icon" #left>
        <mc-svg-icon :name="props.icon" size="300" />
      </template>
      <template v-if="props.title" #top>
        <mc-title>{{ props.title }}</mc-title>
      </template>
      <template v-if="props.description" #bottom>
        <mc-title>{{ props.description }}</mc-title>
      </template>
      <template v-if="props.closable || props.actions.length" #right>
        <mc-button
          v-for="action in props.actions"
          :key="`toast-${action.handler}`"
          :size="ButtonSize.Xs"
          :variation="action.variation || 'gray-outline'"
          :weight="Weights.Normal"
          @click.stop="() => handleCustomButtonAction(action.handler)"
        >
          <template v-if="action.icon" #icon-prepend>
            <mc-svg-icon :name="action.icon" />
          </template>
          {{ action.title }}
        </mc-button>
        <mc-button v-if="props.closable" @click.stop="handleClose" variation="gray-link">
          a
          <template #icon-append>
            <mc-svg-icon name="close" />
          </template>
        </mc-button>
      </template>
    </mc-preview>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/box-shadows' as *;
.mc-toast {
  --mc-toast-background-color: #{$color-white};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-width: 250px;
  max-width: 400px;
  min-height: $space-600;
  border-radius: $radius-100;
  padding: $space-150 $space-200;
  box-shadow: $shadow-s;
  background-color: var(--mc-toast-background-color);
  * {
    color: $color-white;
  }
  &--variation-white {
    * {
      color: $color-black;
    }
  }
  .mc-preview {
    width: 100%;
    align-items: center;
    &__left,
    &__right {
      display: flex;
      align-items: center;
    }
    &__center {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
