import React from 'react'

type Props = {
  children: JSX.Element
}

export default function Background({ children }: Props) {

  return (
    <div style={{
      background: 'yellow',
      width: '100%',
      height: 'calc(100vh - 70px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: "url(/background.png)",
      backgroundSize: '100vw calc(100vh - 70px)'
    }}>
      {children}
    </div>
  )
}
