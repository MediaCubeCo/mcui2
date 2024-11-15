export function timestamp(postfixLength: number = 0): number {
  if (!postfixLength) return Date.now()
  const min = Math.pow(10, postfixLength - 1)
  const max = Math.pow(10, postfixLength) - 1
  return +(String(Date.now()) + String(Math.floor(Math.random() * (max - min + 1)) + min))
}

export function useRandomNumber() {
  return { timestamp }
}