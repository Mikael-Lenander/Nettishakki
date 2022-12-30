import { useEffect, useRef } from 'react'

export default function useDebug(componentName: string, props: { [key: string]: any }) {
  const count = useRenderCount()
  const changedProps = useRef({})
  const previousProps = useRef(props)
  const lastRenderTimestamp = useRef(Date.now())

  const propKeys = Object.keys({ ...props, ...previousProps })
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj
    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] }
    }
  }, {})
  const info = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current
  }

  useEffect(() => {
    previousProps.current = props
    lastRenderTimestamp.current = Date.now()
    console.log('[debug-info]', componentName, info)
  })

  return info
}

function useRenderCount() {
  const count = useRef(1)
  useEffect(() => {
    count.current += 1
  })
  return count.current
}
