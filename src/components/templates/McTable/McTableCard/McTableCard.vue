<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'

const slots = useSlots()
const props = defineProps({
  ml: { // TODO придумать как получить ширину первой колонки
    type: String,
    default: '251px',
  },
  footerBlur: {
    type: Boolean,
    default: false,
  },
})

const bodyEl = ref<HTMLElement | null>(null)
const body_scrolled_to_bottom = ref(true)

const computedFooterClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-table-card__footer': !!slots.footer,
    'mc-table-card__footer--with-blur': props.footerBlur && !body_scrolled_to_bottom.value,
  }
})

const initBlur = () => {
  try {
    body_scrolled_to_bottom.value = false
    bodyEl.value && bodyEl.value.addEventListener('scroll', handlerScroll)
  } catch (e) {
    console.error(e)
  }
}

const handlerScroll = (e: Event) => {
  try {
    if (bodyEl.value) {
      const { offsetHeight, scrollTop, scrollHeight } = bodyEl.value
      body_scrolled_to_bottom.value = offsetHeight + scrollTop === scrollHeight
    }
  } catch (e) {
    body_scrolled_to_bottom.value = true
    console.error(e)
  }
}

onMounted(() => {
  if (props.footerBlur) {
    initBlur()
  }
})

onBeforeUnmount(() => {
  bodyEl.value && bodyEl.value.removeEventListener('scroll', handlerScroll)
})

watch(() => props.footerBlur, (val) => {
  if (val) {
    initBlur()
  } else {
    bodyEl.value && bodyEl.value.removeEventListener('scroll', handlerScroll)
  }
})
</script>

<template>
  <div class="mc-table-card" :style="{ marginLeft: ml }">
    <div v-if="$slots.header" class="mc-table-card__header">
      <!-- @slot Слот заголовка -->
      <slot name="header" />
    </div>
    <div ref="bodyEl" class="mc-table-card__body">
      <!-- @slot Слот контента -->
      <slot />
    </div>
    <div v-if="$slots.footer || footerBlur" :class="computedFooterClasses">
      <!-- @slot Слот футера -->
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../assets/styles/mixins';
@import '../../../../assets/tokens/colors';
@import '../../../../assets/tokens/spacings';
@import '../../../../assets/tokens/sizes';
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
  z-index: 10;
  background-color: $color-white;
  border-inline-start: 1px solid $color-hover-gray;
  display: flex;
  flex-direction: column;
  @include custom-scroll();

  &__header {
    height: $size-500;
    border-bottom: 1px solid $color-hover-gray;
    flex-shrink: 0;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
  }

  &__footer {
    border-top: 1px solid $color-hover-gray;
    flex-shrink: 0;
    padding: $space-200;
    @include child-indent-right($space-150);
    &:empty {
      display: none;
    }
    &--with-blur {
      position: relative;
      &::after {
        @include pseudo;
        height: $space-900;
        background: linear-gradient(to top, $color-white, transparent);
        position: absolute;
        width: 100%;
        inset-inline-start: 0;
        bottom: 100%;
        pointer-events: none;
      }
    }
  }
}
</style>
