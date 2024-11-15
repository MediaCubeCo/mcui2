import { computed, ref, watch } from 'vue'

export function useFieldErrors(errors: string[]) {
  const is_error_visible = ref<boolean>(true)
  const errorText = computed<string | null>(() => {
    if (errors === null || !errors?.length || !is_error_visible.value) return null
    return errors.join(', ')?.replace(/-/gm, '&#x2011;')
  })
  watch(
    () => errors,
    (): void => {
      is_error_visible.value = false
    }
  )
  const toggleErrorVisible = (): void => {
    is_error_visible.value = false
  }

  return {
    is_error_visible,
    errorText,
    toggleErrorVisible
  }
}