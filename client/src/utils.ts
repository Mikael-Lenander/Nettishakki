import { GameOverCondition } from 'shared'
import { format } from 'date-fns'

export function formatName(name: string | null) {
  if (name == null) return null
  return name.startsWith('guest') ? name.slice(0, 14) : name
}

export function formatDate(date: string) {
  return format(new Date(date), 'dd.MM.yyyy HH:mm')
}

export function formatGameOverMessage(gameOverCondition: GameOverCondition, winnerName: string, whiteName: string, blackName: string) {
  const winner = formatName(winnerName)
  const loser = formatName(winnerName == whiteName ? blackName : whiteName)
  switch (gameOverCondition) {
    case GameOverCondition.CheckMate:
      return `${winner} wins by checkmate`
    case GameOverCondition.StaleMate:
      return 'Stalemate'
    case GameOverCondition.InsufficientMaterial:
      return 'Draw by insufficient material'
    case GameOverCondition.Disconnection:
      return `${loser} has disconnected, ${winner} wins`
    case GameOverCondition.Resignation:
      return `${loser} resigns, ${winner} wins`
    case GameOverCondition.Draw:
      return 'Agreed draw'
    case GameOverCondition.TimeOut:
      return `${loser} runs out of time, ${winner} wins`
    case GameOverCondition.ThreefoldRepetition:
      return 'Draw by threefold repetition'
    default:
      throw new Error('Unknown game over message')
  }
}
