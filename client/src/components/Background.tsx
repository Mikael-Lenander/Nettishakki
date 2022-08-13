import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Background() {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 70px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(/background.png)',
          backgroundSize: '40vw'
        }}
      >
        <Outlet />
      </div>
    </>
  )
}
