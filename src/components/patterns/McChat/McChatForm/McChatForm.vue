<script setup lang="ts">
import { McAvatar, McPreview, McSvgIcon, McButton, McFieldText } from '@/components'
import { PropType, ref } from 'vue'
import { ButtonSize, ButtonType, InputTypes } from '@/enums'

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
    type: String as PropType<string | null>,
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

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/line-heights' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/border-radius' as *;
@use '../../../../assets/tokens/sizes' as *;
.mc-chat-form {
  $block-name: &;
  line-height: $line-height-200;

  &__inner {
    @include custom-scroll($space-250);
  }

  .mc-field-text {
    &__input {
      border-radius: $radius-200;
      padding-bottom: $space-150;
    }
    &__append {
      right: $space-50;
      padding: $space-50 0 $space-50 $space-50;
    }
  }

  &__avatar {
    margin-top: $space-50;
  }

  &__btn {
    align-self: flex-end;
    .mc-svg-icon {
      @include size($size-400);
    }
  }
  textarea {
    resize: none !important;
  }
}
</style>
