<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, watch } from 'vue'
import type { IModalServiceState, IModalState } from '@/types/IModal'
import McModalSafeComponent from '@/components/templates/McModal/McModalSafeComponent.vue'

const props = defineProps({
  modalServiceState: {
    type: Object as PropType<IModalServiceState>,
    default: () => ({})
  },
  reactiveProps: {
    type: Object as () => { modals: IModalState[] },
    default: () => ({ modals: [] as IModalState[] })
  }
})

const modalsList = computed((): IModalState[] => {
  return props.reactiveProps?.modals ?? []
})

const containerStyle = computed((): { [key: string]: string | number } => ({
  zIndex: modalsList.value.length ? 99999 : -1,
  visibility: modalsList.value.length ? 'visible' : 'hidden'
}))

const closeModal = (value: IModalState) => {
  value.close()
  setTimeout(() => {
    if (modalsList.value.every((d) => !d.modelValue)) {
      props.modalServiceState.closeServiceState()
    }
  }, 300)
}

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.code === 'Escape' && modalsList.value.length) {
    const last_modal = modalsList.value[modalsList.value.length - 1]
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
  // document.body.style.paddingRight = val ? '15px' : ''
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyUp)

  watch(
    () => modalsList.value.length,
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
    <div v-for="modal in modalsList" :key="modal.id" @close="() => closeModal(modal)">
      <Suspense>
        <mc-modal-safe-component @error-captured="() => closeModal(modal)">
          <component
            v-model="modal.modelValue"
            :is="modal.component"
            v-bind="modal.componentProps"
            @closed="() => closeModal(modal)"
          />
        </mc-modal-safe-component>
      </Suspense>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
