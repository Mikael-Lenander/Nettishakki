import { Move as MoveType, Color, GameOverCondition, FinishedGame, PlayerStats } from 'shared'
import { Game, Move } from '../database-models'
import { Op } from 'sequelize'
import ActiveGame from '../model/ActiveGame'
import userService from './userService'

const saveMoves = async (moves: MoveType[], gameId: number) => {
  const serializedMoves = moves.map(({ oldPos, newPos }, index) => ({
    oldPos: oldPos.toString(),
    newPos: newPos.toString(),
    index,
    gameId
  }))
  // @ts-ignore
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

const save = async (activeGame: ActiveGame, winnerName?: string | null, gameOverCondition?: GameOverCondition) => {
  if (activeGame.saving) return
  activeGame.saving = true
  const { username: whiteName, id: whiteId } = await getUsernameAndId(activeGame, 'white')
  const { username: blackName, id: blackId } = await getUsernameAndId(activeGame, 'black')
  console.log('wu', whiteName, 'bu', blackName, 'wi', whiteId, 'bi', blackId)
  if (whiteId == null && blackId == null) return
  const gameOverMessage = activeGame.game.over()
  const winningColor = winnerName === null ? null : activeGame.playerColor(winnerName) || gameOverMessage.winner
  const overMessage = gameOverCondition || gameOverMessage.message
  // @ts-ignore
  const newGame = await Game.create({ whiteId, blackId, whiteName, blackName, winningColor, overMessage })
  await saveMoves(activeGame.game.board.moves, newGame.id)
}

/* Finds all games by user id where the user is either white or black
  and includes all moves but excludes the move's id and index and sorts
  the moves by index. Also includes the game's winner specified by the
  winner method in the game model. Includes all game's attributes
  but winningColor. */
const find = async (userId: number, username: string): Promise<PlayerStats> => {
  // @ts-ignore
  const games = await Game.findAll({
    where: {
      [Op.or]: [{ whiteId: userId }, { blackId: userId }]
    },
    include: [
      {
        model: Move,
        attributes: { exclude: ['gameId', 'index'] },
        order: [['index', 'ASC']]
      }
    ],
    order: [['date', 'DESC']]
  })
  const finishedGames = games.map<FinishedGame>(game => ({ ...game.toJSON(), winner: game.winner() }))
  const counts = gameCounts(finishedGames, username)
  return { games: finishedGames, gameCounts: counts }
}

const gameCounts = (games: { winner: string }[], username: string) => {
  const stats = { victories: 0, defeats: 0, draws: 0 }
  games.forEach(game => {
    if (game.winner == null) stats.draws++
    else if (game.winner === username) stats.victories++
    else stats.defeats++
  })
  return stats
}

export default { saveMoves, save, find }
