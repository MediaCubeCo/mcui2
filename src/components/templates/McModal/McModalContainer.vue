<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType } from 'vue'
import type { IModalServiceState, IModalState } from '@/types/IModal'

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
  if(e.code === 'Escape' && modals?.length) {
    const last_modal = modals[modals.length - 1]
    //@ts-ignore
    // eslint-disable-next-line no-prototype-builtins
    const clickBackdropToClose = !last_modal?.componentProps?.hasOwnProperty('clickBackdropToClose') || last_modal?.componentProps?.clickBackdropToClose
    if (!clickBackdropToClose) return
    last_modal.close()
  }
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyUp)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <div class="mc-modal-container" :style="containerStyle">
    <div v-for="modal in props.reactiveProps.modals" :key="modal.id" @close="() => closeModal(modal)">
      <component
        v-model="modal.modelValue"
        :is="modal.component"
        v-bind="modal.componentProps"
        @closed="() => closeModal(modal)"
      />
    </div>
  </div>
</template>

<style>
.mc-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
