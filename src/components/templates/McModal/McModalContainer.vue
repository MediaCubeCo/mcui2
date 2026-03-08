<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, watch } from 'vue'
import type { IModalServiceState, IModalState } from '@/types/IModal'
import McDrawerSafeComponent from '@/components/templates/McDrawer/McDrawerSafeComponent.vue'

const props = defineProps({
  modalServiceState: {
    type: Object as PropType<IModalServiceState>,
    default: () => ({})
  },
  reactiveProps: {
    type: Object as () => { modals: IModalState[] },
    default: () => ({})
  }
})

const containerStyle = computed((): { [key: string]: string | number } => ({
  zIndex: props.reactiveProps.modals.length ? 99999 : -1,
  visibility: props.reactiveProps.modals.length ? 'visible' : 'hidden'
}))
const closeModal = (value: IModalState) => {
  value.close()
  setTimeout(() => {
    if (props.reactiveProps.modals.every((d) => !d.modelValue)) {
      props.modalServiceState.closeServiceState()
    }
  }, 300)
}

const handleKeyUp = (e: KeyboardEvent) => {
  const modals = props.reactiveProps?.modals
  if (e.code === 'Escape' && modals?.length) {
    const last_modal = modals[modals.length - 1]
    //@ts-ignore
    // eslint-disable-next-line no-prototype-builtins
    const clickBackdropToClose = !last_modal?.componentProps?.hasOwnProperty('clickBackdropToClose') || last_modal?.componentProps?.clickBackdropToClose
    if (!clickBackdropToClose) return
    last_modal.close()
  }
}

const lockBodyScroll = (val: boolean) => {
  if (typeof window === 'undefined') return

  document.body.style.overflow = val ? 'hidden' : ''
  document.body.style.paddingRight = val ? '15px' : ''
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyUp)

  watch(
    () => props.reactiveProps.modals.length,
    (val) => lockBodyScroll(!!val),
    { immediate: true }
  )
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <div class="mc-modal-container" :style="containerStyle">
    <div v-for="modal in props.reactiveProps.modals" :key="modal.id" @close="() => closeModal(modal)">
      <Suspense>
        <mc-drawer-safe-component @error-captured="() => closeModal(modal)">
          <component
            v-model="modal.modelValue"
            :is="modal.component"
            v-bind="modal.componentProps"
            @closed="() => closeModal(modal)"
          />
        </mc-drawer-safe-component>
      </Suspense>
    </div>
  </div>
</template>

<style lang="scss" src="./McModalContainer.scss"></style>
