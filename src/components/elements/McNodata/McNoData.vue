<script setup lang="ts">
import { McTitle, McSvgIcon, McButton } from '@/components'
import { computed, type PropType } from 'vue'
import { HorizontalAlignment, TitleVariations, Weights } from '@/enums'
import { ColorTypes, IconsListUnion } from '@/types'

import { default as noTableDataImg } from '@/assets/img/no_table_data.png'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps({
  img: {
    type: String as PropType<string>,
    default: noTableDataImg
  },
  icon: {
    type: String as () => IconsListUnion,
    default: null
  },
  title: {
    type: String as PropType<string>,
    default: ''
  },
  text: {
    type: String as PropType<string>,
    default: ''
  },
  href: {
    type: String as PropType<string>,
    default: ''
  },
  btnName: {
    type: String as PropType<string>,
    default: ''
  },
  noAction: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Вариант блока
   * small - стандартный, небольшие отступы
   * large - большие отступы (напр. для табов в админке) + немного меняются дефолтные шрифты тайтла
   * */
  variation: {
    type: String as PropType<'small' | 'large'>,
    default: 'small'
  }
})

const theme = useTheme('noData')

const btnAttrs = computed((): { [key: string]: boolean | string } => {
  return {
    class: 'mt-200',
    loading: props.loading,
    ...(props.href ? { href: props.href } : {})
  }
})

const btnListeners = computed((): { [key: string]: Function } => {
  return !props.href
    ? {
        click: () => handleClick()
      }
    : {}
})

const titleExtraProps = computed((): { [key: string]: string } => {
  return props.variation === 'large'
    ? {
        variation: TitleVariations.Subtitle,
        weight: Weights.SemiBold
      }
    : {}
})

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-no-data': true,
    [`mc-no-data--variation-${props.variation}`]: !!props.variation
  }
})

const styles = computed((): { [key: string]: string } => {
  return {
    '--mc-no-data-link-color': theme.colors[theme.component.link as ColorTypes]
  }
})

const handleClick = (): void => {
  emit('click')
}
</script>

<template>
  <div class="mc-no-data__wrapper">
    <section :class="classes" :style="styles">
      <mc-svg-icon v-if="props.icon" :weight="0.5" :name="props.icon" size="1000" color="outline-gray" />
      <img v-if="props.img" :src="props.img" alt="no_entity" />
      <slot v-if="title || $slots.title" name="title">
        <mc-title
          v-if="props.title"
          v-bind="titleExtraProps"
          color="gray"
          block
          :text-align="HorizontalAlignment.Center"
          :html-data="props.title"
        />
      </slot>
      <div v-if="text || $slots.text" class="mc-no-data__text">
        <slot name="text">
          <mc-title
            color="gray"
            block
            :variation="TitleVariations.Article"
            :text-align="HorizontalAlignment.Center"
            :html-data="text"
          />
        </slot>
      </div>
      <div v-if="(btnName && !noAction) || $slots.action" class="mc-no-data__actions">
        <slot name="action">
          <mc-button v-bind="btnAttrs" v-on="btnListeners">
            {{ btnName }}
          </mc-button>
        </slot>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/media-queries' as *;
.mc-no-data {
  min-width: 100px;
  max-width: 100%;
  padding: 0 $space-200;
  width: 98%;
  text-align: center;
  @include child-indent-bottom($space-100);

  img {
    max-width: $size-1000;
    width: 100%;
    min-width: 0;
    margin-bottom: $space-150 !important;
    user-select: none;
  }

  &__text {
    a {
      color: var(--mc-no-data-link-color);
      text-decoration: none;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding: $space-200;
    width: 100%;
    height: 100%;
    @include align(true, true, absolute);

    @media #{$media-query-l} {
      padding: $space-300 $space-300 $space-400;
    }
    .mc-no-data {
      position: static;
      transform: none;
    }
  }

  &__actions {
    margin-top: $space-200;
  }

  &--variation {
    &-large {
      padding: $space-400;
      @include child-indent-bottom($space-150);
    }
  }
}
</style>
