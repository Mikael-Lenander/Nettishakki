/* import React, { useState } from 'react'

type Props = {
  row: string,
  col: string,
  width: string,
  height: string,
  fill: string,
  setSquareColors: (a: string[][]) => void,
  initSquareColors: string[][]
}

export default function Square({ row, col, width, height, fill, setSquareColors, initSquareColors }: Props) {

  const [color, setColor] = useState<string>(fill)

  function handleClick() {
    setSquareColors(prevColors => {
      const colors = initSquareColors
      colors[]
    })
    console.log('Clicked square')
  }

  return <rect
    onClick={handleClick}
    x={(col * square).toFixed(3)}
    y={y}
    width={width}
    height={height}
    fill={color}
  />
}
 */

import React from 'react'

export default function Square() {
  return (
    <div>
      
    </div>
  )
}
