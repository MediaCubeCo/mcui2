<script setup lang="ts">
import { McGridRow } from '@/components'
import { computed, onBeforeUnmount, onMounted, type PropType, reactive, ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { Spaces, type SpaceTypes } from '@/types/styles/Spaces'
import type { SpacesUnion } from '@/types/styles/Spaces'
import type { ColumnJustifyAlignmentUnion } from '@/types/styles/Grid'
import { ColumnAlignment, ColumnJustifyAlignment } from '@/enums/Grid'

const emit = defineEmits(['content-scrolled'])
const props = defineProps({
  wrap: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  gutterY: {
    type: Number as PropType<number>,
    default: 0
  },
  gutterX: {
    type: Number as PropType<number>,
    default: 0
  },
  justify: {
    type: String as () => ColumnJustifyAlignmentUnion,
    default: ColumnJustifyAlignment.Left
  },
  scrollable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  gutterBottom: {
    type: String as () => SpaceTypes,
    default: null
  },
  hasScroll: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  withBlur: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  moreSpace: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  rtl: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  scrollSpeed: {
    type: Number as PropType<number>,
    default: 1
  },
  tagName: {
    type: String as PropType<string>,
    default: 'div'
  }
})

const drag_options = reactive({
  scroll_pos: 0,
  start_client_pos: 0,
  distance: 0,
  is_drag: false,
  mouse_is_down: false
})

const show_left_blur = ref<boolean>(false)
const show_right_blur = ref<boolean>(false)
const observer = ref<MutationObserver | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)

const containerProps = computed((): { [key: string]: string | number | boolean } => {
  return {
    wrap: props.wrap,
    align: ColumnAlignment.Top,
    gutterY: props.gutterY,
    gutterX: props.gutterX,
    justify: props.justify
  }
})

const containerClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-wrap-scroll': true,
    'mc-wrap-scroll--scrollable': props.scrollable,
    'mc-wrap-scroll--no-scrollbar': !props.hasScroll,
    'mc-wrap-scroll--more-space': props.moreSpace
  }
})

const containerStyles = computed((): { [key: string]: SpacesUnion } => {
  return {
    '--mc-wrap-scroll-bottom': Spaces[props.gutterBottom]
  }
})

const wrapperClasses = computed(() => {
  return {
    [`mc-wrap-scroll__wrapper--left-blur`]: props.withBlur && show_left_blur.value,
    [`mc-wrap-scroll__wrapper--right-blur`]: props.withBlur && show_right_blur.value,
    [`mc-wrap-scroll__wrapper--more-space`]: props.moreSpace
  }
})

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  init()
  setTimeout(() => handlerScroll(), 10)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  scrollContainer.value && scrollContainer.value.removeEventListener('scroll', handlerScroll)
  observer.value && observer.value.disconnect()
})

const init = () => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handlerScroll)
    if (props.withBlur) createMutationObserver()
  }
}
const handlerScroll = useThrottleFn(() => {
  emit('content-scrolled')
  if (!props.withBlur) return
  if (scrollContainer.value) {
    try {
      const container_width = Math.ceil(scrollContainer.value.getBoundingClientRect()?.width)
      const scroll_width = Math.ceil(scrollContainer.value.scrollWidth)
      const scroll_left = Math.ceil(scrollContainer.value.scrollLeft)
      // Левый блюр
      show_left_blur.value = props.rtl
        ? scroll_width > container_width && scroll_width - 10 > Math.abs(scroll_left) + container_width
        : !!scroll_left
      // Правый блюр
      show_right_blur.value = props.rtl
        ? Math.abs(scroll_left) > 1
        : scroll_width > container_width && scroll_width > Math.abs(scroll_left) + container_width
    } catch (e) {
      show_left_blur.value = false
      show_right_blur.value = false
    }
  }
}, 16) // ~60fps

const createMutationObserver = () => {
  if (scrollContainer.value) {
    try {
      observer.value = new MutationObserver(handlerScroll)

      const config = {
        attributes: true,
        childList: true,
        subtree: true
      }
      observer.value.observe(scrollContainer.value, config)
    } catch (e) {
      console.error('Error when try to create observer in McWrapScroll')
    }
  } else console.error('Error when try to create observer in McWrapScroll')
}

const onMouseDown = (e: MouseEvent) => {
  if (scrollContainer.value) {
    const dragOptions = drag_options
    dragOptions.start_client_pos = e.clientX
    dragOptions.mouse_is_down = true
    dragOptions.scroll_pos = scrollContainer.value.scrollLeft
    // // Удалить все выделения на странице, иначе скролл "лагает" если где то на странице есть выделение
    if (window.getSelection) {
      let sel = window.getSelection()
      sel?.removeAllRanges()
    }
  }
}

const onMouseMove = (e: MouseEvent) => {
  if (scrollContainer.value) {
    const dragOptions = drag_options
    if (!dragOptions.mouse_is_down) return
    dragOptions.distance = e.clientX - dragOptions.start_client_pos
    if (Math.abs(dragOptions.distance) > 2 && !dragOptions.is_drag) {
      dragOptions.is_drag = true
    }
    if (dragOptions.is_drag) {
      scrollContainer.value.scrollTo({
        left: dragOptions.scroll_pos - dragOptions.distance * props.scrollSpeed
      })
    }
    // Math.abs(dragOptions.scroll_pos) && (dragOptions.scroll_pos = 0)
  }
}

const onMouseUp = () => {
  drag_options.is_drag && (drag_options.is_drag = false)
  drag_options.mouse_is_down = false
}
</script>

<template>
  <component :is="props.tagName" :class="wrapperClasses" class="mc-wrap-scroll__wrapper">
    <div ref="scrollContainer" :class="containerClasses" :style="containerStyles" @mousedown="onMouseDown">
      <mc-grid-row
        v-bind="containerProps"
        :style="{ 'pointer-events': drag_options.is_drag ? 'none' : 'auto' }"
        class="mc-wrap-scroll__row"
      >
        <slot />
      </mc-grid-row>
    </div>
  </component>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-families' as *;
.mc-wrap-scroll {
  $block-name: &;
  $more-space-indent: $space-200;
  --mc-wrap-scroll-bottom: #{$space-zero};
  padding-bottom: var(--mc-wrap-scroll-bottom);
  margin-bottom: calc((var(--mc-wrap-scroll-bottom)) * -1);
  font-family: $font-family-main;
  &.mc-wrap-scroll--scrollable {
    overflow-x: auto;
    overflow-y: hidden;
  }
  &--more-space {
    padding: $more-space-indent;
    margin: -(#{$more-space-indent});
  }
  &.mc-wrap-scroll--no-scrollbar {
    @include hide-scrollbar();
  }
  &__wrapper {
    position: relative;
    overflow-x: hidden;
    @mixin blur-common-styles {
      @include pseudo();
      top: 0;
      bottom: 0;
      width: $space-500;
      z-index: 2;
      pointer-events: none;
      user-select: none;
    }
    @mixin right-blur {
      background: linear-gradient(to left, #{$color-bg-gray}, rgba($color-bg-gray, 0));
    }
    @mixin left-blur {
      background: linear-gradient(to right, #{$color-bg-gray}, rgba($color-bg-gray, 0));
    }
    &--more-space {
      padding: $more-space-indent;
      margin: -(#{$more-space-indent});
      &#{$block-name}__wrapper {
        &--left-blur {
          #{$block-name} {
            padding-inline-start: 0;
            margin-inline-start: 0;
          }
          &::before {
            top: $more-space-indent;
            bottom: $more-space-indent;
            inset-inline-start: $more-space-indent;
            @include left-blur;
          }
        }
        &--right-blur {
          #{$block-name} {
            padding-right: 0;
            margin-right: 0;
          }
          &::after {
            top: $more-space-indent;
            bottom: $more-space-indent;
            inset-inline-end: $more-space-indent;
            @include right-blur;
          }
        }
      }
    }
    &--left-blur {
      &::before {
        @include blur-common-styles;
        @include left-blur;
        inset-inline-start: 0;
      }
    }
    &--right-blur {
      &::after {
        @include blur-common-styles;
        @include right-blur;
        inset-inline-end: 0;
      }
    }
  }
}
</style>
