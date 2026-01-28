import type { Slots } from 'vue'

export function useHasSlot(slots: Slots) {
  function hasSlot(name: string) {
    try {
      return !!slots[name]?.()
    } catch {
      return false
    }
  }

  return { hasSlot }
}