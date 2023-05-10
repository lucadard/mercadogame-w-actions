export function getRandomInt (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomElements<T> (array: T[], amount: number): T[] {
  if (array.length <= amount) return array
  const indexes: number[] = []
  const selected: T[] = []
  for (let i = 0; i < amount; i++) {
    const newIndex = getRandomInt(0, array.length - 1)
    if (!indexes.includes(newIndex)) {
      selected.push(array[newIndex])
      indexes.push(newIndex)
    } else i--
  }
  return selected
}

export function getNumberWithOrdinal (n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${(s[(v - 20) % 10] || s[v] || s[0])}`
}
