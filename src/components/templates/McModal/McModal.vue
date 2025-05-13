<script setup lang="ts">
import { McSvgIcon } from '@/components'
import { computed, nextTick, type PropType, reactive, ref, watch } from 'vue'
import { LineHeights, type LineHeightTypes, Sizes, type SizeTypes, Spaces, type SpaceTypes } from '@/types'
import { HorizontalAlignment } from '@/enums'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { ModalVariation } from '@/enums/Modal'

const emit = defineEmits<{
  (e: 'before-open'): void
  (e: 'before-close'): void
  (e: 'opened'): void
  (e: 'closed'): void
  (e: 'back', value: Event): void
  (e: 'update:modelValue', value: boolean): void
}>()

const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  name: {
    type: String as PropType<string>
  },
  /**
   * Максимальная ширина модального окна
   * */
  maxWidth: {
    type: Number as PropType<number>,
    default: 510
  },
  /**
   * Минимальная ширина модального окна
   * */
  minWidth: {
    type: Number as PropType<number>,
    default: 480
  },
  /**
   * Скорость анимации
   * */
  duration: {
    type: Number as PropType<number>,
    default: 200
  },
  /**
   * Показывать кнопку закрытия модали
   * */
  closeVisible: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showOverlay: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Нужно ли закрывать попап
   *  кликом вне окна
   */
  clickBackdropToClose: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Стрелка в хедере
   */
  arrowVisible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Кастомное модальное окно
   */
  secondaryModal: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Должен ли контент внутри модалки скроллится с фиксированной шапкой и футером
   * Отключать, когда внутри есть селекты
   * */
  scrollableContent: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * Показывать сепараторы у хедера и футера при скролле.
   */
  separators: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * Выравнивание заголовка в шапке,
   * если centered добавляются отступы слева и справа, чтобы текст не наезжал на кнопки
   * centered || left || right
   * */
  headerAlign: {
    type: String as PropType<HorizontalAlignment>,
    default: 'center'
  },
  /**
   * Отступ от верхнего края модального окна до контента.
   * Для "красивой" обрезки картинки при скролле в ситуациях, когда нет хедера
   */
  topPadding: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Вариация модалки default || info
   * info модалки имеют меньшие размеры паддингов
   * */
  variation: {
    type: String as () => ModalVariation,
    default: 'default'
  }
})

const modalTransitionState = ref<number>(0)
const modalTransition = useTransition(modalTransitionState, {
  duration: props.duration || 300,
  transition: TransitionPresets.easeOutQuart
})

const mcModalBody = ref<HTMLElement | null>(null)
const modalInner = ref<HTMLElement | null>(null)

const data = reactive({
  scrolled_top: false,
  scrolled_bottom: false,
  resize_observer: {} as ResizeObserver,
  small_indents: false,
  can_shorten_modal: false,
  modal_params: {} as { [key: string]: string | number },
  indent: {
    regular: '400',
    small: '150'
  } as { [key: string]: SpaceTypes },
  footer: {
    button: {
      regular: '600',
      small: '500'
    } as { [key: string]: SizeTypes }
  },
  header: {
    title: {
      line_height: {
        regular: '300',
        small: '250'
      } as { [key: string]: LineHeightTypes }
    }
  }
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-modal--arrow-visible': props.arrowVisible,
    'mc-modal--scrolled-top': data.scrolled_top,
    'mc-modal--scrolled-bottom': data.scrolled_bottom,
    'mc-modal--scrollable': props.scrollableContent,
    'mc-modal--top-padding': props.topPadding,
    'mc-modal--small-indents': data.small_indents,
    [`mc-modal--variation-${props.variation}`]: !!props.variation,
    [`mc-modal--header-align-${props.headerAlign}`]: (props.closeVisible || props.arrowVisible) && !!props.headerAlign
  }
})

const styles = computed((): { [key: string]: string | number } => {
  return {
    '--mc-modal-padding': Spaces[data.indent.regular],
    '--mc-modal-padding-small': Spaces[data.indent.small],
    '--mc-modal-header-line-height': LineHeights[data.header.title.line_height.regular],
    '--mc-modal-header-line-height-small': LineHeights[data.header.title.line_height.small],
    '--mc-modal-button-height': Sizes[data.footer.button.regular],
    '--mc-modal-button-height-small': Sizes[data.footer.button.small],
    '--mc-modal-max-width': `${props.maxWidth + 24}px`,
    '--mc-modal-min-width': `${props.minWidth - 24}px`,
    '--mc-modal-state-number': modalTransition.value
  }
})

/**
 * Устанавливаем сепараторы, если есть скролл
 * @param {Boolean} scrolled - если метод вызван скроллом
 */
const calculateSeparators = (scrolled: boolean = true): void => {
  if (!scrolled) {
    data.scrolled_top = false
    data.scrolled_bottom = false
    data.small_indents = false
  }

  setTimeout(
    () => {
      if (mcModalBody.value) {
        const { scrollTop, scrollHeight, clientHeight } = mcModalBody.value
        // Сепаратор появится если высота скролла будет > 2px
        const offset = 2
        data.scrolled_top = scrollTop > offset
        data.small_indents = data.scrolled_top && data.can_shorten_modal
        data.scrolled_bottom = scrollTop + clientHeight < scrollHeight - offset
      }
    },
    scrolled ? 0 : 300
  )
}

const handleBeforeClose = (): void => {
  /**
   * Событие перед закрытием
   * @property {Object}
   */
  emit('before-close')
  if (mcModalBody.value) {
    data.resize_observer && data.resize_observer.unobserve(mcModalBody.value)
    mcModalBody.value.removeEventListener('scroll', () => calculateSeparators())
  }
}

const handleOpened = (): void => {
  if (props.separators) {
    getParams()
    if (mcModalBody.value) {
      mcModalBody.value.addEventListener('scroll', () => calculateSeparators(), {
        passive: true
      })
      data.resize_observer = new ResizeObserver(() => resizeHandler())
      data.resize_observer.observe(mcModalBody.value)
    }
    calculateSeparators()
  }

  /**
   * Событие после открытия
   * @property {Object}
   */
  emit('opened')
}

const handleBack = (event: Event): void => {
  emit('back', event)
}

const getParams = (): void => {
  try {
    if (modalInner.value) {
      Object.keys(styles.value).forEach((attr) => {
        //@ts-ignore
        const param = parseInt(getComputedStyle(modalInner.value)?.getPropertyValue(attr))
        param && (data.modal_params[attr] = param)
      })
    }
  } catch (e) {
    console.error(e)
  }
}

const calculateIndents = (): void => {
  /* Если шапка уже маленькая, то отключаем при отключении сепаратора
   * Иначе смотрим, чтобы отступ был > чем убираемые отступы, т.к. нет смысла сжимать шапку, если <
   */
  const indentDifferences =
    (+data.modal_params?.['--mc-modal-padding'] - +data.modal_params?.['--mc-modal-padding-small']) * 3 +
    +data.modal_params?.['--mc-modal-padding-small']
  const lineHeightDifferences =
    +data.modal_params?.['--mc-modal-header-line-height'] - +data.modal_params?.['--mc-modal-header-line-height-small']
  const buttonDifferences =
    +data.modal_params?.['--mc-modal-button-height'] - +data.modal_params?.['--mc-modal-button-height-small']
  const sizeDifferences = indentDifferences + lineHeightDifferences + buttonDifferences
  if (!data.small_indents && mcModalBody.value) {
    data.can_shorten_modal = mcModalBody.value?.scrollHeight - mcModalBody.value?.clientHeight > sizeDifferences
  }
}

const resizeHandler = (): void => {
  calculateIndents()
  calculateSeparators()
}

const openModal = (): void => {
  modalTransitionState.value = 1
  emit('before-open')
  emit('update:modelValue', true)
  nextTick(() => handleOpened())
}
const closeModal = (): void => {
  modalTransitionState.value = 0
  setTimeout(() => {
    handleBeforeClose()
    emit('update:modelValue', false)
    emit('closed')
  }, props.duration || 300)
}

const handleOverlayClick = (): void => {
  if (!props.clickBackdropToClose) return
  closeModal()
}

watch(
  () => props.modelValue,
  (value): void => {
    value ? openModal() : closeModal()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="props.modelValue" class="mc-modal__wrapper">
    <div v-if="props.showOverlay" class="mc-modal__overlay" @click.stop="handleOverlayClick" />
    <div class="mc-modal" :class="classes" :style="styles">
      <div ref="modalInner" class="mc-modal__inner">
        <div v-if="$slots.title" class="mc-modal__header">
          <div class="mc-modal__title">
            <!-- @slot Слот заголовка -->
            <slot name="title" />
          </div>
        </div>
        <div ref="mcModalBody" class="mc-modal__body">
          <!-- @slot Слот контента -->
          <slot />
        </div>
        <!-- @slot Слот футера -->
        <!-- Телепорта в футер <Teleport to="#mcModalFooter"> -->
        <div class="mc-modal__control" id="mcModalFooter">
          <slot name="footer" />
        </div>
      </div>
      <button v-if="arrowVisible" type="button" class="mc-modal__btn-back" @click.prevent="handleBack">
        <mc-svg-icon name="arrow_leftward" class="mc-modal__icon-back" />
      </button>
      <button v-if="closeVisible" type="button" class="mc-modal__btn-close" @click.prevent="closeModal">
        <mc-svg-icon class="mc-modal__icon-close" width="24" height="24" name="close" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/z-indexes' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/media-queries' as *;
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/box-shadows' as *;
@use 'sass:color' as sasscolor;

.mc-modal {
  $block-name: &;
  $border-color: #dee1e9;
  $box-shadow-color: #20008c28;
  $border-color: $color-hover-gray;
  --mc-modal-padding: #{$space-400};
  --mc-modal-padding-small: #{$space-150};
  --mc-modal-header-line-height: #{$line-height-300};
  --mc-modal-header-line-height-small: #{$line-height-250};
  --mc-modal-button-height: #{$size-600};
  --mc-modal-button-height-small: #{$size-500};
  --mc-modal-max-width: 510px;
  --mc-modal-min-width: 768px;
  --mc-modal-state-number: 0;

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: var(--mc-modal-state-number);
  z-index: 2;

  @media #{$media-query-s} {
    --modal-scale: calc(var(--mc-modal-state-number) * 0.1 + 0.9);
    padding: 12px 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(var(--modal-scale));
    height: auto;
    max-height: 80%;
    max-width: var(--mc-modal-max-width);
    min-width: var(--mc-modal-min-width);
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color-black, 0.5);
    display: flex;
    justify-content: flex-start;
    &--hidden {
      background: transparent;
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
  }
  &__btn-close,
  &__btn-back {
    transition: $duration-s all;
    @include reset-btn();
    @include close-link();
  }
  &__btn-close {
    @include position(absolute, var(--mc-modal-padding) $space-200 null null);
    @media #{$media-query-s} {
      @include position(absolute, var(--mc-modal-padding) $space-600 null null);
    }
  }
  &__btn-back {
    @include position(absolute, var(--mc-modal-padding) null null $space-200);
    @media #{$media-query-s} {
      @include position(absolute, var(--mc-modal-padding) null null $space-600);
    }
  }
  &__icon-close {
    @include size($size-300);
    transition: color $duration-s;
  }
  &.overlay-fade-enter-active,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transition: all $duration-s;
      transform: translate3d(0, 0, 0);
    }
  }
  &.overlay-fade-enter,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transform: translate3d(0, -20px, 0);
    }
  }
  &.mc-modal--secondary {
    .mc-modal {
      &__inner {
        border-radius: $radius-400;
        box-shadow: 0 15px 30px $box-shadow-color;
        padding: $space-400;
      }
      &__btn-close,
      &__btn-back {
        top: 27px;
      }
      &__btn-close {
        inset-inline-end: $space-400;
      }
      &__btn-back {
        inset-inline-start: $space-400;
      }
      &__header {
        padding-bottom: 9px;
        border-bottom: 2px solid $border-color;
        margin-bottom: var(--mc-modal-padding);
      }
      &__control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mc-button {
          border-radius: $radius-150;
        }
      }
    }
  }

  &__header {
    flex-shrink: 0;
    transition: $duration-s all;
    padding: var(--mc-modal-padding) $space-200 $space-350;
    border-color: $border-color;
    @media #{$media-query-s} {
      padding: $space-350;
      .mc-title {
        transition: $duration-s all;
        line-height: var(--mc-modal-header-line-height);
      }
    }
    &:has(#{$block-name}__title:empty) {
      display: none;
      & + #{$block-name}__body {
        padding-top: $space-400;
      }
    }
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    color: hsl(0, 0%, 13%);
    font-family: $font-family-main;
  }

  &__body {
    padding: $space-50 $space-200 $space-200;
    flex-grow: 1;
    min-height: 0;
    overflow-x: hidden;
    > *:only-child {
      min-height: 100%;
    }
    @media #{$media-query-s} {
      padding: $space-50 $space-400 $space-200;
      overflow: visible;
    }
  }
  &__inner {
    box-shadow: $shadow-s;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100% !important;
    > *:first-child {
      padding-top: var(--mc-modal-padding);
    }
    > *:last-child {
      padding-bottom: var(--mc-modal-padding);
    }
    @media #{$media-query-s} {
      overflow: visible;
      /* прячет рандомный скроллбар при включении модалки */
      -ms-overflow-style: none;
      scrollbar-width: none;
      border-radius: $radius-100;
      margin: 0 $space-150;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &--scrollable {
    overflow: hidden !important;
    #{$block-name} {
      &__body {
        overflow-y: auto;
        overflow-x: hidden;
      }
      &__inner {
        overflow-x: hidden;
        @media #{$media-query-s} {
          max-height: 80vh;
        }
      }
    }
  }
  &--header-align {
    &-center {
      #{$block-name} {
        &__header {
          padding-inline: $space-500;
          text-align: center;
          @media #{$media-query-s} {
            padding-inline: $space-700;
          }
        }
      }
    }
    &-left {
      #{$block-name} {
        &__header {
          padding-bottom: $space-150;
        }
      }
    }
  }
  &--small-indents {
    @media #{$media-query-s} {
      #{$block-name} {
        &__control {
          padding-block: var(--mc-modal-padding-small) !important;
          .mc-button {
            height: var(--mc-modal-button-height-small);
          }
        }
        &__header {
          padding-block: var(--mc-modal-padding-small) !important;
          .mc-title {
            font-weight: $font-weight-semi-bold;
            font-size: $font-size-300;
            line-height: var(--mc-modal-header-line-height-small);
            align-items: center;
          }
        }
        &__body {
          padding-bottom: $space-50;
        }
        &__btn {
          &-back,
          &-close {
            top: var(--mc-modal-padding-small) !important;
          }
        }
      }
    }
  }

  &--scrolled {
    $separator-border: 1px solid $border-color;
    &-top {
      #{$block-name} {
        &__header {
          border-bottom: $separator-border;
        }
      }
    }
    &-bottom {
      #{$block-name} {
        &__control:not(:empty) {
          border-top: $separator-border;
        }
      }
    }
  }
  &--top-padding {
    #{$block-name}__inner:before {
      content: '';
      height: $space-400;
      min-height: $space-400;
    }
  }
  &__control {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    padding: $space-200 $space-200 $space-400;
    transition: $duration-s all;
    @media #{$media-query-s} {
      padding: $space-200 $space-300 $space-400;
    }
    .mc-button {
      width: 100%;
    }
    @media #{$media-query-s} {
      .mc-button {
        min-width: 100px;
        height: var(--mc-modal-button-height);
        transition: $duration-s all;
        width: unset;
      }
    }
    &:empty {
      position: relative;
      padding: $space-350 0 0;
    }
    &:not(:empty) {
      border-color: $border-color;
    }
  }
  &:has(&__control:empty) {
    #{$block-name} {
      &__body {
        padding-bottom: $space-50;
      }
    }
  }
  &--variation {
    &-info {
      #{$block-name} {
        &__header {
          @media #{$media-query-s} {
            padding: $space-300 $space-300 $space-150;
          }
        }
        &__btn-close {
          @media #{$media-query-s} {
            top: $space-300;
          }
        }
        &__inner {
          & > *:first-child {
            @media #{$media-query-s} {
              padding-top: $space-300;
            }
          }
          & > *:last-child {
            @media #{$media-query-s} {
              padding-bottom: $space-300;
            }
          }
        }
        &__body {
          padding-bottom: $space-50;
          @media #{$media-query-s} {
            padding-inline: $space-300;
          }
        }
        &__control {
          padding-top: $space-250;
          @media #{$media-query-s} {
            padding-top: $space-150;
          }
        }
      }
    }
  }
  @at-root {
    html[dir='rtl'] {
      #{$block-name} {
        &__btn-back {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
