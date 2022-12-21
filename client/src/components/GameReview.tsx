import React, { useMemo } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { range } from 'lodash'
import { Pos } from 'shared'
import ChessImage from './ChessImage'
import { useAppSelector } from '../state/hooks'
import { GameOverMessage } from 'shared'
import { Navigate, useParams } from 'react-router-dom'
import { FinishedGame } from 'shared'
import { Circle as CircleIcon, CircleOutlined } from '@mui/icons-material'
import { Card, Typography } from '@mui/material'
import useBoard from '../hooks/useBoard'

interface Square {
  id: string
  pos: Pos
  fill: string
}

interface Props {
  game: FinishedGame
}

function Board({ game }: Props) {
  const width = 650
  const height = 650
  const squareSize = width / 8
  const user = useAppSelector(state => state.user)
  const { board, nextMove } = useBoard(game)

  const squares = useMemo((): Square[][] => {
    return range(0, 8).map(row =>
      range(0, 8).map(col => ({
        id: `(${col}, ${row})`,
        pos: new Pos(col, row),
        fill: row % 2 === col % 2 ? '#8ca2ad' : '#dee3e6'
      }))
    )
  }, [])

  const flip = (pos: Pos): Pos =>
    new Pos(game.whiteName === user.username ? pos.x : 7 - pos.x, game.whiteName === user.username ? 7 - pos.y : pos.y)

  function handleClickBoard() {
    nextMove()
  }
  return (
    <div style={{ margin: '1em' }}>
      <Stage width={width} height={height} onClick={handleClickBoard}>
        <Layer>
          {squares.map(row =>
            row.map(square => (
              <Rect
                key={square.id}
                col={square.pos.x}
                row={square.pos.y}
                x={flip(square.pos).x * squareSize}
                y={flip(square.pos).y * squareSize}
                width={squareSize}
                height={squareSize}
                fill={square.fill}
              />
            ))
          )}
          {board.map((row, y) =>
            row.map((piece, x) => {
              if (!piece) return null
              return (
                <ChessImage
                  key={`${x} ${y}`}
                  x={x}
                  y={y}
                  pieceName={piece.name}
                  pieceColor={piece.color}
                  playerColor={game.whiteName === user.username ? 'white' : 'black'}
                  squareSize={squareSize}
                />
              )
            })
          )}
        </Layer>
      </Stage>
    </div>
  )
}

function InfoBar({ game }: Props) {
  function formatGameOverMessage(data: GameOverMessage) {
    if (!data.winner) return `draw by ${data.message}`
    return `${data.winner} wins by ${data.message}`
  }

  const { username } = useAppSelector(state => state.user)

  const players = {
    white: game.whiteName,
    black: game.blackName
  }

  const text = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '22px'
  } as React.CSSProperties

  return (
    <Card variant='outlined' style={{ alignSelf: 'center', padding: '0.5em' }}>
      <Typography style={text}>
        <CircleOutlined />
        {players.white.substring(0, 15)}
      </Typography>
      <Typography style={text}>
        <CircleIcon />
        {players.black.substring(0, 15)}
      </Typography>
      <hr />
      {game.overMessage && (
        <Typography style={{ fontSize: '20px' }}>
          {formatGameOverMessage({ message: game.overMessage, winner: game.winningColor })}
        </Typography>
      )}
    </Card>
  )
}

export default function GameReview() {
  const { id: gameId } = useParams()
  const game = useAppSelector(state => state.user.games.find(game => game.id === parseInt(gameId)))

  if (!game) return <Navigate to='/' />

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em' }}>
      <Board game={game} />
      <InfoBar game={game} />
    </div>
  )
}
