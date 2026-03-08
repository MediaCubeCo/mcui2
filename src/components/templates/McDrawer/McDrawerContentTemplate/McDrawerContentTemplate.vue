<script setup lang="ts">
import { TitleVariations } from '@/enums/Title'
import { Weights } from '@/enums/ui/Weights'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import type { PropType } from 'vue'
import { useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  /**
   * Заголовок
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  titleEllipsis: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})
</script>

<template>
  <div class="mc-drawer-content-template">
    <div v-if="$slots.title || props.title" class="mc-drawer-content-template__header">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title :variation="TitleVariations.Subtitle" :ellipsis="props.titleEllipsis" :weight="Weights.SemiBold">
          {{ props.title }}
        </mc-title>
      </slot>
    </div>
    <div class="mc-drawer-content-template__body">
      <div class="mc-drawer-content-template__tint"></div>
      <div class="mc-drawer-content-template__body-inner">
        <!-- @slot Слот контента -->
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" class="mc-drawer-content-template__footer">
      <!-- @slot Слот футера -->
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
