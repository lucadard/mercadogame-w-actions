function getRandomInt (min: number, max: number): number {
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
