<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'
import { computed, type PropType, ref, watch } from 'vue'
import { McSvgIcon } from '@/components'
import type { IconsListUnion } from '@/types/styles/Icons'
import type { DrawerPositionsUnion } from '@/types/IDrawer'
import { DrawerPositions } from '@/enums/Drawer'

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}>()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number as PropType<number>,
    default: 300
  },
  position: {
    type: String as () => DrawerPositionsUnion,
    default: DrawerPositions.Right
  },
  /**
   * Нужна ли кнопка
   * закрытия в шапке
   */
  closeVisible: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showOverlay: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  disableBgClick: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Тип иконки
   * закрытия в шапке
   */
  iconClose: {
    type: String as () => IconsListUnion,
    default: 'close'
  },
  /**
   * If prop less than or equal 100, this will be a percentage. All above will be in pixels
   * */
  width: {
    type: Number as PropType<number>,
    default: 400
  }
})

const overlayStartAnimationPosition = ref<number>(0)
const overlayEndAnimationPosition = ref<number>(100)
const isRightDrawerPosition = computed((): boolean => {
  return props.position === DrawerPositions.Right
})
const drawerStartAnimationPosition = computed((): number => {
  return isRightDrawerPosition.value ? 100 : -100
})
const drawerStartStaticPosition = computed((): { [key: string]: number } => {
  return {
    [isRightDrawerPosition.value ? DrawerPositions.Right : DrawerPositions.Left]: 0
  }
})

const overlayStateNumber = ref<number>(overlayStartAnimationPosition.value)
const drawerStateNumber = ref<number>(drawerStartAnimationPosition.value)

const drawerNumber = useTransition(drawerStateNumber, {
  duration: props.duration,
  transition: TransitionPresets.easeOutQuart
})

const drawerOverlayNumber = useTransition(overlayStateNumber, {
  duration: props.duration,
  transition: TransitionPresets.easeOutQuart
})

const overlayStyle = computed((): { [key: string]: number | string } => {
  return {
    visibility: drawerOverlayNumber.value ? 'visible' : 'hidden',
    zIndex: drawerOverlayNumber.value ? 1 : -1,
  }
})

const drawerStyle = computed((): { [key: string]: number | string } => {
  return {
    width: props.width <= 100 ? `${props.width}%` : `${props.width}px`,
    [props.position]: 0,
    ...drawerStartStaticPosition.value,
    ...(drawerNumber.value ? {transform: `translateX(${drawerNumber.value}%)`} : {}),
  }
})

const wrapperClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-drawer__wrapper': true,
    'mc-drawer__wrapper--hidden': !props.showOverlay
  }
})

const overlayClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-drawer__overlay': true,
    'mc-drawer__overlay--hidden': !props.showOverlay
  }
})

const openDrawer = () => {
  overlayStateNumber.value = overlayEndAnimationPosition.value
  drawerStateNumber.value = overlayStateNumber.value === 0 ? 100 : 0
  if (!props.modelValue) {
    emit('update:modelValue', true)
    emit('open')
  }
}
const closeDrawer = () => {
  overlayStateNumber.value = overlayStartAnimationPosition.value
  drawerStateNumber.value = overlayStateNumber.value === 0 ? (isRightDrawerPosition.value ? 100 : -100) : 0
  if (props.modelValue) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleOverlayClick = () => {
  if (!props.showOverlay || props.disableBgClick) return
  closeDrawer()
}

watch(
  () => props.modelValue,
  (value) => {
    value ? openDrawer() : closeDrawer()
  },
  { immediate: true }
)
</script>

<template>
  <div :class="wrapperClasses" :style="overlayStyle">
    <div v-if="props.showOverlay" :class="overlayClasses" :style="overlayStyle" @click.stop="handleOverlayClick" />
    <div class="mc-drawer" :style="drawerStyle" @click.stop>
      <slot />
      <button v-if="closeVisible" type="button" class="mc-drawer__btn-close" @click.prevent="closeDrawer">
        <mc-svg-icon class="mc-drawer__icon-close" :name="iconClose" />
        <mc-svg-icon class="mc-drawer__icon-close--small" :name="iconClose" size="200" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/tokens/box-shadows' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/media-queries' as *;
@use '../../../assets/styles/mixins' as *;
.mc-drawer {
  $block-name: &;
  position: absolute;
  top: 0;
  bottom: 0;
  background: white;
  height: 100%;
  box-shadow: $shadow-s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 2;
  pointer-events: all;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: flex-start;
    pointer-events: all;
    &--hidden {
      background: transparent;
      pointer-events: none;
    }
  }
  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
    &--hidden {
      background: transparent;
      pointer-events: none;
    }
  }
  &__btn-close {
    z-index: 1;
    padding: $space-100 !important;
    & {
      @include close-link();
    }
    & {
      @include position(absolute, $space-100 $space-100 null null);
    }
    & {
      @include reset-btn();
    }
  }
  &__icon-close {
    @include size($size-300);
    &--small {
      display: none;
    }
  }
  @media #{$media-query-m-down} {
    #{$block-name}__icon-close {
      display: none;
      &--small {
        display: block;
      }
    }
  }
}
</style>
