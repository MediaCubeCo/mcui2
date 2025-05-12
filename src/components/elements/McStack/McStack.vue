<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, h, useSlots, createApp, type PropType, onBeforeMount } from 'vue'
import { Spaces } from '@/types'
import { McTooltip } from '@/components'
import { TooltipSizes } from '@/enums'

const emit = defineEmits<{
  (e: 'updated:hidden-count', value: number): any[]
}>()
const props = defineProps({
  visibleCount: {
    type: Number as PropType<number>,
    default: Infinity
  },
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  overflowTooltip: {
    type: String as PropType<string>,
    default: null,
  },
})

const slots = useSlots()
const container = ref<HTMLElement | null>(null)
const children =
  (slots.default && slots.default()[0].children?.length
    ? slots.default()[0].children
    : //@ts-ignore
      slots.default()) || []

//@ts-ignore
const visibleChildren = ref<any[]>([])
const hiddenCount = ref<number>(0)
const prevHiddenCount = ref<number>(-1)

const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-stack': true,
    'mc-stack--collapsed': props.collapsed
  }
})

onBeforeMount(() => {
  updateChildrenVisible()
})

onMounted(() => {
  const resizeObserver = new ResizeObserver(updateChildrenVisible)
  if (container.value) resizeObserver.observe(container.value)

  updateChildrenVisible()

  onUnmounted(() => {
    resizeObserver.disconnect()
  })
})

const updateChildrenVisible = (): void => {
  if (!container.value) return

  let totalWidth = 0
  visibleChildren.value = []
  let itemCount = 0
  hiddenCount.value = 0

  const tempContainer = document.createElement('div')
  tempContainer.style.position = 'absolute'
  tempContainer.style.visibility = 'hidden'
  tempContainer.style.whiteSpace = 'nowrap'
  document.body.appendChild(tempContainer)

  //@ts-ignore
  for (const item of children) {
    const vnode = h(item)
    const itemNode = document.createElement('div')
    tempContainer.appendChild(itemNode)

    const app = createApp({ render: () => vnode })
    app.mount(itemNode)

    const itemWidth = props.collapsed
      ? itemNode.getBoundingClientRect().width + 6
      : itemNode.getBoundingClientRect().width + 4
    app.unmount()
    itemNode.remove()

    const moreContentWidth = parseInt(Spaces['300'])
    const itemIndent = props.collapsed ? -parseInt(Spaces['200']) : parseInt(Spaces['150'])

    if (
      totalWidth + (itemWidth + itemIndent) <= container.value.clientWidth - moreContentWidth &&
      itemCount < props.visibleCount
    ) {
      totalWidth += itemWidth + itemIndent
      visibleChildren.value.push(item)
      itemCount++
    } else {
      //@ts-ignore
      hiddenCount.value = children.length - visibleChildren.value.length
      break
    }
  }
  document.body.removeChild(tempContainer)
  if (+prevHiddenCount.value !== +hiddenCount.value) {
    prevHiddenCount.value = hiddenCount.value
    emit('updated:hidden-count', hiddenCount.value)
  }
}
</script>

<template>
  <div ref="container" :class="classes">
    <div ref="content" class="mc-stack__content">
      <template v-for="(child, i) in visibleChildren" :key="`mc-stack-item-${i}`">
        <component :is="child" />
      </template>
      <span v-if="hiddenCount > 0" class="mc-stack__more-label">
        <mc-tooltip v-if="overflowTooltip" :key="overflowTooltip" :size="TooltipSizes.Xs" :content="overflowTooltip">
          +{{ hiddenCount }}
        </mc-tooltip>
        <template v-else>+{{ hiddenCount }}</template>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/styles/mixins' as *;
.mc-stack {
  $block-name: &;
  overflow: hidden;
  white-space: nowrap;
  &__content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    @include child-indent-right($space-150);
  }
  &--collapsed {
    #{$block-name}__content {
      @include child-indent-right(-#{$space-200});
      & > *:not(#{$block-name}__more-label) {
        border: 2px solid $color-white;
      }
    }
    #{$block-name}__more-label {
      margin-inline-start: $space-250;
    }
  }
  &__more-label {
    margin-inline-start: $space-50;
    white-space: nowrap;
    font-size: $font-size-200;
    line-height: $line-height-200;
    color: $color-gray;
    font-weight: $font-weight-semi-bold;
    font-family: $font-family-main;
    width: $space-300;
  }
}
</style>
