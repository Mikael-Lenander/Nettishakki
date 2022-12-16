import { Move as MoveType, Color, GameOverCondition } from 'shared'
import { Game, Move } from '../database-models'
import ActiveGame from '../model/ActiveGame'
import userService from './userService'

const saveMoves = async (moves: MoveType[], gameId: number) => {
  const serializedMoves = moves.map(({ oldPos, newPos }, index) => ({
    oldPos: oldPos.toString(),
    newPos: newPos.toString(),
    index,
    gameId
  }))
  await Move.bulkCreate(serializedMoves)
}

const getUsernameAndId = async (activeGame: ActiveGame, color: Color): Promise<{ username: string; id: number | null }> => {
  const player = activeGame.playerWithColor(color)
  if (player.isAuthenticated) {
    const user = await userService.findByName(player.username)
    return { username: user.username, id: user.id }
  }
  return { username: player.username, id: null }
}

const saveGame = async (activeGame: ActiveGame, winnerUsername?: string, gameOverCondition?: GameOverCondition) => {
  console.log('activeGame', activeGame)
  if (activeGame.saved) return
  const { username: whiteName, id: whiteId } = await getUsernameAndId(activeGame, 'white')
  const { username: blackName, id: blackId } = await getUsernameAndId(activeGame, 'black')
  console.log('wu', whiteName, 'bu', blackName, 'wi', whiteId, 'bi', blackId)
  if (whiteId == null && blackId == null) return
  const gameOverMessage = activeGame.game.over()
  const winningColor = activeGame.playerColor(winnerUsername) || gameOverMessage.winner
  const overMessage = gameOverCondition || gameOverMessage.message
  // @ts-ignore
  const newGame = await Game.create({ whiteId, blackId, whiteName, blackName, winningColor, overMessage })
  await saveMoves(activeGame.game.board.moves, newGame.id)
  activeGame.saved = true
}

export default { saveMoves, saveGame }
