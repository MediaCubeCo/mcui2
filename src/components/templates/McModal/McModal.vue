<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, type PropType, reactive, ref, useSlots, watch } from 'vue'
import { LineHeights, type LineHeightTypes } from '@/types/styles/LineHeights'
import { Sizes, type SizeTypes } from '@/types/styles/Sizes'
import { Spaces, type SpaceTypes } from '@/types/styles/Spaces'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { ModalVariation } from '@/enums/Modal'
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))

const slots = useSlots()

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
const resize_observer = ref<ResizeObserver | null>(null)

const data = reactive({
  scrolled_top: false,
  scrolled_bottom: false,
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

const hasTitleSlot = computed((): boolean => {
  return !!slots['title']
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
    [`mc-modal--header-align-${props.headerAlign}`]: (props.closeVisible || props.arrowVisible) && !!props.headerAlign,
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
    '--mc-modal-state-number': modalTransition.value,
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

const scrollHandler = () => calculateSeparators()

const handleBeforeClose = (): void => {
  /**
   * Событие перед закрытием
   * @property {Object}
   */
  emit('before-close')
  if (mcModalBody.value) {
    resize_observer.value && resize_observer.value.disconnect()
    mcModalBody.value.removeEventListener('scroll', scrollHandler)
  }
}

const handleOpened = (): void => {
  if (props.separators) {
    getParams()
    if (mcModalBody.value) {
      mcModalBody.value.addEventListener('scroll', scrollHandler, {
        passive: true
      })
      resize_observer.value = new ResizeObserver(resizeHandler)
      resize_observer.value.observe(mcModalBody.value)
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
        const param = parseFloat(getComputedStyle(modalInner.value)?.getPropertyValue(attr)) * parseFloat(getComputedStyle(document.documentElement).fontSize)
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
  nextTick(handleOpened)
}
const closeModal = (): void => {
  modalTransitionState.value = 0
  handleBeforeClose()
  emit('closed')
  emit('update:modelValue', false)
}

const handleOverlayClick = (): void => {
  if (!props.clickBackdropToClose) return
  closeModal()
}

watch(
  () => props.modelValue,
  (value, oldValue): void => {
    if (value === oldValue) return
    value ? openModal() : closeModal()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="props.modelValue" class="mc-modal__wrapper">
    <div v-if="props.showOverlay" class="mc-modal__overlay" @click.stop="handleOverlayClick" />
    <div class="mc-modal" :class="classes" :style="styles">
      <div ref="modalInner" class="mc-modal__inner" :class="{ 'mc-modal__inner--with-title': $slots.title }">
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
        <div v-if="$slots.footer" class="mc-modal__control" id="mcModalFooter">
          <slot name="footer" />
        </div>
        <button v-if="arrowVisible" type="button" class="mc-modal__btn-back" @click.prevent="handleBack">
          <mc-svg-icon name="arrow_leftward" class="mc-modal__icon-back" />
        </button>
        <button v-if="closeVisible" type="button" class="mc-modal__btn-close" @click.prevent="closeModal">
          <mc-svg-icon class="mc-modal__icon-close" width="24" height="24" name="close" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
