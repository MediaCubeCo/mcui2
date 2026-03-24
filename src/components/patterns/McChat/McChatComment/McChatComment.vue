<script setup lang="ts">
import { computed, defineAsyncComponent, PropType, ref } from 'vue'
import { ButtonSize } from '@/enums/ui/Button'
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import { ColorTypes } from '@/types/styles/Colors'
import { IComment, ICommentTitle } from '@/types/IComment'
const McPreview = defineAsyncComponent(() => import('@/components/patterns/McPreview/McPreview.vue'))
const McTitle = defineAsyncComponent(() => import('@/components/elements/McTitle/McTitle.vue'))
const McDate = defineAsyncComponent(() => import('@/components/elements/McDate/McDate.vue'))
const McAvatar = defineAsyncComponent(() => import('@/components/elements/McAvatar/McAvatar.vue'))
const McBadge = defineAsyncComponent(() => import('@/components/elements/McBadge/McBadge.vue'))
const McSvgIcon = defineAsyncComponent(() => import('@/components/elements/McSvgIcon/McSvgIcon.vue'))
const McButton = defineAsyncComponent(() => import('@/components/elements/McButton/McButton.vue'))
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

<style lang="scss" src="./index.scss"></style>
