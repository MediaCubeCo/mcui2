<script setup lang="ts">
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McSlideUpDown from '@/components/elements/McSlideUpDown/McSlideUpDown.vue'
import { computed, type PropType, ref, useSlots, watch, inject, onMounted } from 'vue'
import type { ICollapse, ICollapseEmitPayload } from '@/types/ICollapse'
import { useRandomNumber } from '@/composables/useRandomNumber'

const randomNumber = useRandomNumber()
const selfRegisterCollapseMethod: Function = inject('selfRegisterCollapseMethod', () => {})
const accordionTriggerMethod: Function = inject('accordionTriggerMethod', () => {})

const slots = useSlots()
const emit = defineEmits<{
  (e: 'toggle', value: ICollapseEmitPayload): void
  (e: 'open', value: ICollapseEmitPayload): void
  (e: 'close', value: ICollapseEmitPayload): void
  (e: 'collapse-open-start', value: ICollapseEmitPayload): void
  (e: 'collapse-open-end', value: ICollapseEmitPayload): void
  (e: 'collapse-close-start', value: ICollapseEmitPayload): void
  (e: 'collapse-close-end', value: ICollapseEmitPayload): void
}>()
const props = defineProps({
  /*
   * Если нужно
   * отключённое состояние
   */
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /*
   * Если нужен бордер
   */
  border: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Иконка состояния коллапса
   *
   */
  icon: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const id = ref<number>(randomNumber.timestamp(5))
const isCollapsed = ref<boolean>(false)
const animated = ref<boolean>(false)

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-collapse--is-open': isCollapsed.value,
    'mc-collapse--is-disabled': props.isDisabled,
    'mc-collapse--is-empty': isEmpty.value,
    'mc-collapse--has-icon': props.icon,
    'mc-collapse--border': props.border
  }
})
const isEmpty = computed((): boolean => {
  return !slots.body
})

const iCollapseParams = computed((): ICollapse => {
  return {
    isDisabled: props.isDisabled,
    border: props.border,
    icon: props.icon,
    id: id.value,
    isCollapsed: isCollapsed.value,
    open: open,
    close: close,
    toggle: toggle
  }
})

onMounted((): void => {
  if (selfRegisterCollapseMethod) {
    const payload: ICollapse = iCollapseParams.value

    selfRegisterCollapseMethod(payload)
  }
})

watch(
  () => isCollapsed.value,
  (value: boolean): void => {
    /**
     * Событие тоггла
     */
    const payload: ICollapseEmitPayload = { value, component: iCollapseParams.value }
    emit('toggle', payload)
    value ? emit('open', payload) : emit('close', payload)
    if (accordionTriggerMethod) {
      accordionTriggerMethod(value ? 'open' : 'close', payload)
    }
  }
)
const open = (): void => {
  if (props.isDisabled || animated.value) return
  isCollapsed.value = true
}
const close = (): void => {
  if (props.isDisabled || animated.value) return
  isCollapsed.value = false
}
const toggle = (): void => {
  if (props.isDisabled || animated.value) return
  isCollapsed.value = !isCollapsed.value
}
const slideOpenStart = (value: boolean): void => {
  animated.value = true
  const payload: ICollapseEmitPayload = { value, component: iCollapseParams.value }
  /**
   * Событие перед началом открытия
   */
  emit('collapse-open-start', payload)
}
const slideOpenEnd = (value: boolean): void => {
  animated.value = false
  const payload: ICollapseEmitPayload = { value, component: iCollapseParams.value }
  /**
   * Событие после открытия
   */
  emit('collapse-open-end', payload)
}
const slideCloseStart = (value: boolean): void => {
  animated.value = true
  const payload: ICollapseEmitPayload = { value, component: iCollapseParams.value }
  /**
   * Событие перед началом закрытия
   */
  emit('collapse-close-start', payload)
}
const slideCloseEnd = (value: boolean): void => {
  animated.value = false
  const payload: ICollapseEmitPayload = { value, component: iCollapseParams.value }
  /**
   * Событие после закрытия
   */
  emit('collapse-close-end', payload)
}
</script>

<template>
  <section class="mc-collapse" :class="classes">
    <div class="mc-collapse__header" tabindex="0" @keyup.esc="close">
      <mc-svg-icon
        v-if="icon && !isEmpty"
        class="mc-collapse__icon"
        name="arrow_drop_down"
        :color="isDisabled ? 'outline-gray' : 'black'"
      />
      <!-- @slot Слот для элемента по которому будет меняться состояние компонента -->
      <div v-if="slots.activator" @click="toggle">
        <slot name="activator" />
      </div>
      <a v-if="slots.body" class="mc-collapse__link" href="#" @click.prevent="toggle" />
    </div>
    <mc-slide-up-down
      class="mc-collapse__body"
      :active="isCollapsed"
      :duration="300"
      @slide-open-start="slideOpenStart"
      @slide-open-end="slideOpenEnd"
      @slide-close-start="slideCloseStart"
      @slide-close-end="slideCloseEnd"
    >
      <div class="mc-collapse__body-inner">
        <!-- @slot Слот контента -->
        <slot name="body" />
      </div>
    </mc-slide-up-down>
    <div v-if="slots.bottom" class="mc-collapse__bottom">
      <!-- @slot Общий нижний слот -->
      <slot name="bottom" />
    </div>
  </section>
</template>

<style lang="scss">
@import '../../../assets/styles/mixins';
@import '../../../assets/tokens/durations';
@import '../../../assets/tokens/colors';
@import '../../../assets/tokens/spacings';
.mc-collapse {
  $block-name: &;

  &--border {
    border-radius: $radius-100;
    border: 1px solid $color-outline-gray;

    #{$block-name} {
      &__header {
        display: flex;
        padding: $space-100 $space-200;
      }
    }
  }

  &__link {
    display: block;
    @include position(absolute, 0);
    z-index: 1;
  }

  &__header {
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    position: relative;
  }

  &__icon {
    transition: all $duration-s;
    margin-inline: $space-50 $space-50;
  }

  &__body {
    #{$block-name} {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid $color-outline-gray;

      &__header {
        padding-inline: $space-400 $space-200;
      }

      &__body {
        #{$block-name} {
          &__header {
            padding-inline-start: $space-800;
          }
        }
      }

      &:first-child {
        border-top: 1px solid $color-outline-gray;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__bottom {
    position: relative;
  }

  &--is-open {
    > #{$block-name} {
      &__header {
        #{$block-name} {
          &__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  &--is-empty {
    #{$block-name} {
      &__header {
        cursor: default;
        &:hover {
          color: inherit;
        }
      }
      &__link {
        cursor: default;
      }
    }
  }

  &--is-disabled {
    #{$block-name} {
      &__header {
        cursor: not-allowed;
        color: $color-outline-gray;
        &:hover {
          color: $color-outline-gray;
        }
      }
      &__link {
        cursor: not-allowed;
      }
    }
  }

  &--has-icon {
    &#{$block-name}--is-empty {
      #{$block-name}__header {
        padding-inline-start: $space-400;
      }
    }
  }
}
</style>
