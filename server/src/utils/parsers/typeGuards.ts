import { Color } from 'shared'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isColor = (color: unknown): color is Color => {
  return isString(color) && ['white', 'black'].includes(color)
}
