import React, { useRef, useState } from 'react'
import Square from './Square'
import { range } from 'lodash'

export default function Board() {

  const initSquareColors = range(0, 8).map(row =>
    range(0, 8).map(col =>
      (row % 2) === (col % 2) ? '#dee3e6' : '#8ca2ad'
    )
  )

  const [squareColors, setSquareColors] = useState<string[][]>(initSquareColors)
  const boardRef = useRef<SVGSVGElement>(null)
  const width = 650
  const height = 650
  const square = width / 8
  const pt = boardRef.current && boardRef.current.createSVGPoint();

  function clickBoard(event: React.MouseEvent) {
      console.log(event)
    }

  return (
    <div>
{/*       <svg ref={boardRef} width={width} height={height} onClick={clickBoard}>
        <rect x='0' y='0' width={width} height={height} fill='#FFFFFF' />
        {range(0, 8).map(row =>
          range(0, 8).map(col => {
            return <rect key={`(${row}, ${col})`}
              x={(square * col).toFixed(3)}
              y={(square * row).toFixed(3)}
              width={square.toFixed(3)}
              height={square.toFixed(3)}
              fill={squareColors[row][col]}
            />
          })
        )}
      </svg> */}
    </div>
  )
}
