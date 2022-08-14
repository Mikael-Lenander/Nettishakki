import { isString } from './typeGuards'

export const parseString = (str: unknown, paramName: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${paramName}: ${str}`)
  }
  return str
}
