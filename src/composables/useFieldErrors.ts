import { computed, ref } from 'vue'

export function useFieldErrors(errors: string[]) {
  const is_error_visible = ref<boolean>(true)
  const errors_text = ref(errors)

  const errorText = computed((): string | null => {
    if (errors_text.value === null || !errors_text.value?.length || !is_error_visible.value) return null
    return errors_text.value.join(', ')?.replace(/-/gm, '&#x2011;')
  })

  const toggleErrorVisible = function(): void {
    is_error_visible.value = false
  }
  const setError = function (payload: string[]): void{
    errors_text.value = payload
    is_error_visible.value = true
  }

  return {
    is_error_visible,
    errorText,
    toggleErrorVisible,
    setError,
  }
}