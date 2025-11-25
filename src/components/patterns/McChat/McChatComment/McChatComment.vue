<script setup lang="ts">
import { McPreview, McTitle, McDate, McAvatar, McBadge, McSvgIcon, McButton } from '@/components'
import { computed, PropType, ref } from 'vue'
import { ButtonSize, TitleVariations, Weights } from '@/enums'
import { ColorTypes, IComment, ICommentTitle } from '@/types'
/**
 * Используется только в McChat
 */

const emit = defineEmits<{
  (e: 'delete', value: number | string): void
}>()
const props = defineProps({
  /**
   * Объект данных
   * комментария
   */
  comment: {
    type: Object as () => IComment,
    default: () => ({}),
    required: true
  },
  /**
   * Можно липроизводить
   * действия с комментарием
   */
  editable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Значение по умолчанию
   * системного комментария
   */
  defaultUserName: {
    type: String as PropType<string>,
    default: 'System comment'
  },
  /**
   * Формат даты (dayjs)
   */
  dateFormat: {
    type: String as PropType<string>,
    default: 'YYYY-MM-DD HH:mm'
  }
})

const a = ref<HTMLElement | null>(null)

const canEdit = computed((): boolean => {
  return props.editable && !('status' in props.comment)
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-chat-comment': true,
    'mc-chat-comment--editable': canEdit.value
  }
})

const computedAvatar = computed((): string | undefined => {
  return props.comment?.moderator?.avatar ?? props.comment?.user?.avatar ?? props.comment?.user?.profile?.avatar
})

const computedTitle = computed((): ICommentTitle => {
  const hasUserName = !!props.comment?.user?.full_name
  return {
    name: props.comment?.user?.full_name || props.defaultUserName,
    weight: hasUserName ? Weights.SemiBold : Weights.Medium,
    color: hasUserName ? 'black' : 'purple'
  }
})

const commentWithLinks = computed(() => {
  const regExp = /((http|https):\/\/)?(([0-9a-zA-Zа-яА-Я.-]*)\.([a-zA-Zа-яА-Я]+[^\s,.;:'"\])]+)(\/[^ ,.;\/\])]*)?)/gi
  return props.comment.content.replace(regExp, (match) => {
    // Проверяем, является ли match файлом
    if (/\.(jpg|jpeg|png|svg|pdf|csv|webp|doc|docx)$/i.test(match)) return match
    const url = /^http/.test(match) ? match : `http://${match}`
    return `<a class="mc-chat-comment__link" href='${url}' target="_blank">${match.trim()}</a>`
  })
})

const filteredComment = computed(() => {
  return commentWithLinks.value
})

const commentStatus = computed((): { [key: string]: string } => {
  return props.comment?.status || {}
})

const contentStyles = computed((): { [key: string]: string | number } => {
  let color = props.comment?.status?.color?.replace('-outline', '')
  let opacity = 0.1
  if (color === 'outline-gray') {
    color = 'hover-gray'
    opacity = 1
  }
  return {
    ['--mc-chat-comment-color']: `var(--color-${color})`,
    ['--mc-chat-comment-opacity']: opacity
  }
})

const contentClasses = computed((): { [key: string]: boolean } => {
  return {
    'mc-chat-comment__content': !!props.comment?.status
  }
})

const handleDelete = (): void => {
  emit('delete', props.comment?.id)
}

const handleClick = (): void => {
  a.value && a.value.focus()
}
</script>

<template>
  <div :class="classes" :style="contentStyles" @click="handleClick">
    <a ref="a" href="javascript:void(0);" class="mc-chat-comment__back"></a>
    <mc-preview>
      <template #left>
        <mc-avatar size="400" rounded lazy :src="computedAvatar" />
      </template>
      <template #top>
        <mc-date :size="TitleVariations.Overline" color="dark-gray" :format="dateFormat" :model-value="comment?.created_at" />
      </template>
      <template #bottom>
        <div class="mc-chat-comment__title">
          <mc-title :weight="computedTitle.weight" :color="computedTitle.color">
            {{ computedTitle.name }}
          </mc-title>
          <mc-title v-if="comment.statusText" :variation="TitleVariations.Overline" color="dark-gray">
            {{ comment.statusText }}
          </mc-title>
          <mc-badge v-if="commentStatus && commentStatus.color" :variation="commentStatus.color as ColorTypes">
            {{ commentStatus.title }}
          </mc-badge>
          <mc-title v-else-if="comment.editing_title">
            {{ comment.editing_title }}
          </mc-title>
        </div>
        <mc-title v-if="comment.content" :ellipsis="false" :class="contentClasses" :html-data="filteredComment" />
        <mc-title v-if="comment.message" :ellipsis="false" pre-line class="mc-chat-comment__message"
          >{{ comment.message }}
        </mc-title>
      </template>
      <template #right>
        <mc-button
          v-if="canEdit"
          class="mc-chat-comment__btn"
          :size="ButtonSize.XsCompact"
          variation="gray-link"
          secondary-color="red"
          @click.prevent="handleDelete"
        >
          <template #icon-prepend>
            <mc-svg-icon name="delete" />
          </template>
        </mc-button>
      </template>
    </mc-preview>
  </div>
</template>

<style lang="scss">
@use '../../../../assets/styles/mixins' as *;
@use '../../../../assets/tokens/spacings' as *;
@use '../../../../assets/tokens/border-radius' as *;
@use '../../../../assets/tokens/colors' as *;
.mc-chat-comment {
  $block-name: &;
  --mc-chat-comment-color: initial;
  --mc-chat-comment-opacity: initial;
  padding: $space-50;
  border-radius: $radius-100;
  display: block;
  cursor: default;
  position: relative;
  &__title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @include child-indent-right($space-50);
    > * {
      margin-bottom: $space-50;
    }
    .mc-badge {
      flex-shrink: 0;
    }
    .mc-title {
      width: auto;
      overflow: hidden;
    }
  }
  &__back {
    text-decoration: none;
    display: block;
    @include position(absolute, 0);
    border-radius: $radius-100;
  }

  &__btn {
    visibility: hidden;
  }
  &__link {
    color: $color-purple;
    &:hover,
    &:focus {
      color: var(--color-main-dark);
    }

    &:active {
      color: var(--color-main-dark);
    }
  }

  .mc-preview {
    z-index: 10;
    position: relative;
  }

  .mc-preview__bottom {
    margin-top: $space-50;
  }
  &__content {
    margin-top: $space-50;
    border-radius: $radius-100;
    padding: $space-150 $space-200;
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      @include size(100%);
      background-color: var(--mc-chat-comment-color);
      opacity: var(--mc-chat-comment-opacity);
    }
  }
  &__message {
    margin-top: $space-100;
    padding: $space-150 $space-200;
    border-radius: $radius-100;
    background-color: $color-hover-gray;
    .mc-title__text {
      word-break: break-all;
    }
  }
  &--editable {
    cursor: pointer;
    &:focus-within {
      background-color: $color-hover-gray;
      #{$block-name}__btn {
        visibility: visible;
      }
    }
    &:active {
      background-color: $color-hover-gray;
      #{$block-name}__btn {
        visibility: visible;
      }
    }
  }
}
</style>
