import { Color } from "../types";

export function opponent(color: Color): Color {
  return color === 'white' ? 'black' : 'white'
}

export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}