<script setup lang="ts">
import { defineAsyncComponent, PropType, ref } from 'vue'
import { ButtonSize, ButtonType } from '@/enums/ui/Button'
import { InputTypes } from '@/enums/Input'

const McAvatar = defineAsyncComponent(() => import('@/components/elements/McAvatar/McAvatar.vue'))
const McPreview = defineAsyncComponent(() => import('@/components/patterns/McPreview/McPreview.vue'))
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))
const McButton = defineAsyncComponent(() => import('@/components/elements/McButton/McButton.vue'))
const McFieldText = defineAsyncComponent(() => import('@/components/elements/McFieldText/McFieldText.vue'))

/**
 * Используется только в McChat
 */

const emit  = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const props = defineProps({
  /**
   * Значение инпута
   */
  modelValue: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  /**
   * Состояние загрузки/отправки
   * данных
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * Аватар пользователя
   */
  avatar: {
    type: String as PropType<string>,
    default: null,
  },
  /**
   * Плейсхолдер инпута
   */
  placeholder: {
    type: String as PropType<string>,
    default: '',
  },
})

const prettyValue = ref(props.modelValue)

const handleInput = (value: string): void => {
  prettyValue.value = value
  /**
   * Событие инпута
   * @property {string}
   */
  emit('update:modelValue', value)
}

const handleSubmit = (): void => {
  if (prettyValue.value?.trim() === '') return
  prettyValue.value = ''
  /**
   * Событие по отправке
   */
  emit('submit')
}

const toNewRow = (): void => {
  prettyValue.value += '\n'
}
</script>

<template>
  <div class="mc-chat-form">
    <form @submit.prevent="handleSubmit">
      <mc-preview class="mc-chat-form__inner">
        <template #left>
          <mc-avatar class="mc-chat-form__avatar" size="400" rounded :src="avatar" />
        </template>
        <template #top>
          <mc-field-text
            name="chat-field"
            class="mc-chat-form__input"
            :type="InputTypes.TextareaAutosize"
            :min-height="40"
            :max-height="250"
            :model-value="prettyValue"
            :placeholder="placeholder"
            @update:modelValue="handleInput"
            @keydown.enter.native.prevent.exact="handleSubmit"
            @keydown.ctrl.enter.native="toNewRow"
          >
            <template #append>
              <mc-button
                class="mc-chat-form__btn"
                variation="main-link"
                :size="ButtonSize.MCompact"
                :type="ButtonType.Submit"
                rounded
                :loading="loading"
                @click.prevent="handleSubmit"
              >
                <template #icon-append>
                  <mc-svg-icon name="send_solid" />
                </template>
              </mc-button>
            </template>
          </mc-field-text>
        </template>
      </mc-preview>
    </form>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
