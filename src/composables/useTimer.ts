import { ref, onBeforeUnmount } from 'vue'

export function useTimer(callback: Function, duration: number) {
  const timeToEnd = ref<number>(duration)
  const timerStart = ref<number>(Date.now())
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null)

  function start() {
    timerStart.value = Date.now()
    timeout.value && clearTimeout(timeout.value) // ✅ Очищаем предыдущий таймер
    timeout.value = setTimeout(() => callback(), timeToEnd.value)
  }
  
  function pause() {
    timeToEnd.value = timeToEnd.value - (Date.now() - timerStart.value)
    timeout.value && clearTimeout(timeout.value)
  }

  function stop() {
    if (timeout.value) {
      clearTimeout(timeout.value)
      timeout.value = null
    }
  }

  // ✅ Очистка при размонтировании компонента
  onBeforeUnmount(() => {
    stop()
  })

  return {
    start,
    pause,
    stop
  }
}
