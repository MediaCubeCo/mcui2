import { ref } from 'vue'

export function useTimer(callback: Function, duration: number) {
  const timeToEnd = ref<number>(duration)
  const timerStart = ref<number>(Date.now())
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null)

  function start() {
    timerStart.value = Date.now()
    timeout.value = setTimeout(() => callback(), timeToEnd.value)
  }
  function pause() {
    timeToEnd.value = timeToEnd.value - (Date.now() - timerStart.value)
    timeout.value && clearTimeout(timeout.value)
  }

  return {
    start,
    pause
  }
}
