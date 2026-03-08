<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, h, useSlots, createApp, type PropType, onBeforeMount } from 'vue'
import { Spaces, SpacesUnion } from '@/types/styles/Spaces'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'
import { TooltipSizes } from '@/enums/Tooltip'

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
let resizeObserver: any = null

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
  resizeObserver = new ResizeObserver(updateChildrenVisible)
  if (container.value) resizeObserver.observe(container.value)

  updateChildrenVisible()
})

onUnmounted(() => {
  resizeObserver && resizeObserver.disconnect()
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
    const getSize = (size: SpacesUnion): number => parseFloat(size) * parseInt(getComputedStyle(document.documentElement).fontSize)
    const moreContentWidth = getSize(Spaces['300'])
    const itemIndent = props.collapsed ? -getSize(Spaces['200']) : getSize(Spaces['150'])

    if (
      (totalWidth + (itemWidth + itemIndent) <= container.value.clientWidth - moreContentWidth &&
      itemCount < props.visibleCount) || itemCount === 0
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

<style lang="scss" src="./index.scss"></style>
