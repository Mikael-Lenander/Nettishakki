import { useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { changeTime } from '../state/reducers/gameReducer'

export default function useTimer() {
  const timeout = useRef<NodeJS.Timeout>()
  const { turn: color, active, moves } = useAppSelector(state => state.game)
  const timeLeft = useAppSelector(state => state.game.timeLeft[color])
  const interval = 1000
  const toNextInterval = timeLeft % interval
  console.log(`timeLeft ${timeLeft} toNextSecond ${toNextInterval}`)
  const dispatch = useAppDispatch()

  function startTimer() {
    const expected = Date.now() + toNextInterval
    const newTimeout = setTimeout(step(toNextInterval, expected), toNextInterval)
    timeout.current = newTimeout
    // console.log(`start timer, toNextSecond ${toNextSecond}, color ${color}`)
  }

  function stopTimer() {
    // console.log(`stop timer, color ${color}`)
    clearTimeout(timeout.current)
  }

  function step(time: number, expected: number) {
    return function inner() {
      const drift = Date.now() - expected
      dispatch(changeTime({ color, delta: -time }))
      const newTimeout = setTimeout(step(interval, expected + interval), Math.max(0, interval - drift))
      timeout.current = newTimeout
      // console.log(`step, drift ${drift}, time ${time}, expected ${expected} color ${color} interval-drift ${interval - drift}`)
    }
  }

  useEffect(() => {
    if (moves.length === 0) return
    startTimer()
    return stopTimer
  }, [color])

  useEffect(() => {
    if (!active) stopTimer()
  }, [active])

  return { startTimer, stopTimer }
}
