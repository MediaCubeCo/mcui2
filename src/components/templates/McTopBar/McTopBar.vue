<script setup lang="ts">
import { McAvatar, McButton, McSvgIcon, McSeparator, McDropdown } from '@/components'
import { type PropType, ref, useSlots } from 'vue'
import { useHasSlot } from '@/composables'
import { ButtonSize, DropdownPositions, HorizontalAlignment } from '@/enums'
import type { IconsListUnion } from '@/types'

const slots = useSlots()
const { hasSlot } = useHasSlot(slots)

const props = defineProps({
  /**
   *  Данные пользователя
   *
   */
  user: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  /**
   *  Меню языков
   *
   */
  menuLangs: {
    type: Array,
    default: () => []
  },
  /**
   *  Локализация или текст по умолчанию
   *
   */
  defaultLang: {
    type: String as PropType<string>,
    default: 'Выберите язык'
  },
  /**
   *  Текущая локализация
   *
   */
  currentLang: {
    type: String as PropType<string>,
    default: null
  }
})

const menuLangsDD = ref<HTMLElement | null>(null)
const localesDropdownOpen = ref(false)
const userDropdownOpen = ref(false)
</script>

<template>
  <div class="mc-top-bar">
    <div class="mc-top-bar__inner">
      <div v-if="hasSlot('left')" class="mc-top-bar__left">
        <slot name="left" />
      </div>
      <div class="mc-top-bar__right">
        <slot name="right" />
        <mc-dropdown
          v-if="menuLangs && menuLangs.length"
          ref="menuLangsDD"
          :items="menuLangs"
          v-model="localesDropdownOpen"
          list-min-width="auto"
          class="mc-top-bar__menu-langs"
        >
          <template #activator>
            <mc-button variation="black-link" uppercase>
              {{ currentLang || defaultLang }}
              <template #icon-append>
                <mc-svg-icon class="rotate" name="arrow_drop_down" />
              </template>
            </mc-button>
          </template>
          <template #item="{ item }">
            <mc-button
              :to="item.to || item.href"
              :exact="item.exact"
              variation="black-flat"
              :text-align="HorizontalAlignment.Left"
              full-width
            >
              <template #icon-prepend>
                <mc-svg-icon :name="`flag_${item.name.toLowerCase()}` as IconsListUnion" />
              </template>
              {{ item.name }}
            </mc-button>
          </template>
        </mc-dropdown>
        <slot name="user">
          <mc-dropdown v-if="props.user" v-model="userDropdownOpen" :position="DropdownPositions.Right">
            <template #activator>
              <mc-button variation="white-flat" :size="ButtonSize.MCompact">
                <template #icon-prepend>
                  <mc-avatar :src="props.user.avatar" rounded size="400" />
                </template>
              </mc-button>
            </template>
            <slot name="user-dropdown-panel" />
          </mc-dropdown>
        </slot>
      </div>
    </div>
    <mc-separator color="hover-gray" indent-top="100" />
    <slot name="bottom" />
  </div>
</template>

<style lang="scss">
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/colors' as *;
.mc-top-bar {
  $block-name: &;

  width: 100%;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-100 $space-150 0 $space-150;
    @include child-indent-right($space-100);
  }

  &__left,
  &__right {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    @include child-indent-right($space-100);
  }

  &__right {
    min-width: 0;
    flex: 1 1 auto;
    justify-content: flex-end;
  }
  &__menu-langs {
    .mc-svg-icon {
      svg {
        rect {
          stroke: $color-hover-gray;
        }
      }
    }
  }
}
</style>
