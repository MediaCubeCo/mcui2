<script setup lang="ts">
import { McChatForm, McChatComment, McSvgIcon, McTitle, McInfinityLoadingTrigger } from '@/components'
import { computed, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue'
import { McDrawerContentTemplate } from '@/components/index.js'
import { IComment } from '@/types'
import { HorizontalAlignment, Weights } from '@/enums'

const emit = defineEmits<{
  (e: 'loading'): void
  (e: 'update:modelValue', value: string): void
  (e: 'chat-submit', value: string): void // old bus event
  (e: 'chat-input', value: string): void // old bus event
  (e: 'chat-delete', value: string | number): void // old bus event
  (e: 'submit', value: string): void
  (e: 'delete', value: number | string): void
}>()
const props = defineProps({
  /**
   * Заголовок
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Массив комментариев
   */
  comments: {
    type: Array as PropType<IComment[]>,
    default: () => []
  },
  /**
   * Значение инпута
   */
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  /**
   * Можно ли производить
   * действия с комментариями
   */
  editable: {
    type: Boolean,
    default: false
  },
  /**
   * Аватар пользователя
   */
  avatar: {
    type: String,
    default: null
  },
  /**
   * Плейсхолдер инпута
   */
  placeholder: {
    type: String,
    default: ''
  },
  /**
   * Текст при отсутствии
   * сообщений в чате
   */
  emptyMessage: {
    type: String,
    default: ''
  },
  /**
   * Отображение инпута
   * для отправки сообщения
   */
  showInput: {
    type: Boolean,
    default: true
  },
  /**
   * Отступ сверху
   */
  indentTop: {
    type: Number,
    default: 0
  },
  /**
   * Значение по умолчанию
   * системного комментария
   */
  defaultUserName: {
    type: String,
    default: 'System comment'
  },
  /**
   * Формат даты (dayjs)
   */
  dateFormat: {
    type: String,
    default: 'YYYY-MM-DD HH:mm'
  },
  /**
   * Если сообщений показано меньше, чем всего
   */
  hasMoreMessages: {
    type: Boolean,
    default: false
  }
})

const prettyValue = ref('')
const loading = ref(false)
const scrollElement = ref<HTMLElement | null>(null)
const formElement = ref(null)
const formElementOldHeight = ref(null)
const indicator = ref(null)
const chat_form = ref<HTMLElement | null>(null)


const sortedComments = computed((): IComment[] => {
  const comments = [...props.comments]
  return comments.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
})

const indicatorPosition = computed((): number => {
  //@ts-ignore
  return props.comments.length ? indicator.value?.$el?.offsetTop : 0
})

const setPosition = (className: string, { height = '100%', top = 0 } = {}): void => {
  const els = document.getElementsByClassName(className)
  if (els.length) {
    //@ts-ignore
    els[0].style.top = `${top}px`
    //@ts-ignore
    els[0].style.height = height
  }
}

const setScrollElement = (): void => {
  const parent = document.querySelector('.mc-chat__comments')?.parentElement
  if (parent) {
    scrollElement.value = parent as HTMLElement
  }
}

const scrollContentToBottom = (): void => {
  setTimeout(() => {
    scrollElement.value && scrollElement.value.scrollTo(0, scrollElement.value.scrollHeight)
  }, 10)
}

const handleLoading = (): void => {
  emit('loading')
}

/**
 * скроллит контент (необходимо, чтобы фиксировать контент на месте при подгрузке новых сообщений)
 * если не указан аргумент, то в самый низ
 * */
const scrollContent = (position: number): void => {
  setTimeout(() => {
    scrollElement.value && scrollElement.value.scrollTo(0, position || scrollElement.value.scrollHeight)
  }, 10)
}

const handleInput = (value: string): void => {
  prettyValue.value = value
  /**
   * Событие ввода
   * @property {string}
   */
  emit('update:modelValue', value)
  emit('chat-input', value)
  //@ts-ignore
  if (formElement.value && formElement.value.offsetHeight !== formElementOldHeight.value) {
    //@ts-ignore
    formElementOldHeight.value = formElement.value.offsetHeight
    scrollContentToBottom()
  }
}

const handleSubmit = () => {
  loading.value = true
  /**
   * Событие по отправке
   */
  if (prettyValue.value) {
    emit('submit', prettyValue.value)
    emit('chat-submit', prettyValue.value)
  }
}

const handleDelete = (id: string | number) => {
  /**
   * Событие по удалению
   */
  emit('delete', id)
  emit('chat-delete', id)
}

onMounted(() => {
  setPosition('mc-drawer', { height: 'auto', top: props.indentTop })
  if (props.showInput && chat_form.value) {
    //@ts-ignore
    formElement.value = chat_form.value.$el
    //@ts-ignore
    formElementOldHeight.value = chat_form.value.$el.offsetHeight
  }
  setScrollElement()
  scrollContentToBottom()
})

onBeforeUnmount(() => {
  setPosition('mc-drawer')
})


watch(() => props.comments, (newVal, prevVal) => {
  scrollContent(prevVal.length < newVal.length ? +indicatorPosition.value : 0)
  loading.value = false
}, { deep: true })
</script>

<template>
  <div class="mc-chat">
    <mc-drawer-content-template>
      <template #title>
        <mc-title :ellipsis="false" :weight="Weights.SemiBold">{{ title }}</mc-title>
      </template>
      <div v-if="comments.length" class="mc-chat__comments">
        <mc-infinity-loading-trigger
          v-if="hasMoreMessages"
          ref="indicator"
          active
          :overlap="0"
          @loading="handleLoading"
        />
        <mc-chat-comment
          v-for="comment in sortedComments"
          :key="comment.id"
          :comment="comment"
          :default-user-name="defaultUserName"
          :editable="props.editable && comment.editable"
          :date-format="dateFormat"
          @delete="handleDelete"
        />
      </div>
      <div v-else class="mc-chat__empty-notice">
        <mc-svg-icon name="chat_forum" color="outline-gray" size="1000" :weight="1" />
        <mc-title v-if="emptyMessage" color="outline-gray" :text-align="HorizontalAlignment.Center">{{ emptyMessage }}</mc-title>
      </div>
      <template #footer>
        <mc-chat-form
          v-if="showInput"
          ref="chat_form"
          :model-value="props.modelValue"
          :loading="loading"
          :avatar="avatar"
          :placeholder="placeholder"
          @update:modelValue="handleInput"
          @submit="handleSubmit"
        />
      </template>
    </mc-drawer-content-template>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/spacings' as *;
.mc-chat {
  $block-name: &;
  height: 100%;

  .mc-drawer-content-template {
    &__body-inner {
      display: flex;
      flex-direction: column-reverse;
      padding-left: $space-150;
      padding-right: $space-150;
    }
  }
  .mc-drawer {
    &__header {
      padding-top: calc(#{$space-150} - 1px);
      padding-bottom: $space-150;
      z-index: 12;
    }
    &__btn-close {
      @include position(absolute, 0 0 null null);
      z-index: 12;
    }
  }

  &__comments {
    > *:first-child {
      margin-top: $space-400;
    }
    @include child-indent-bottom($space-100);
  }

  &__empty-notice {
    @include align(true, true, absolute);
    @include child-indent-bottom($space-150);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
