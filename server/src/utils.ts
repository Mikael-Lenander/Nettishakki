import { Color } from "shared/chess"

export function randomColor(): Color {
  return ['white', 'black'][Math.floor(Math.random() * 2)] as Color
}

export function generateUniqueId(ids: string[]): string {
  const id = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('')
  if (!ids.includes(id)) return id
  return generateUniqueId(ids)
}