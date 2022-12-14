import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../state/hooks'

type Props = {
  redirectPath?: string
  children?: JSX.Element
  isProtected?: boolean
}

function RestrictedRoute({ redirectPath = '/', children, isProtected }: Props) {
  const user = useAppSelector(state => state.user)

  if (user.isGuest == isProtected) return <Navigate to={redirectPath} />

  return children != null ? children : <Outlet />
}

export const PrivateRoute = ({ redirectPath = '/', children }: Props) => (
  <RestrictedRoute redirectPath={redirectPath} isProtected={true}>
    {children}
  </RestrictedRoute>
)

export const PublicRoute = ({ redirectPath = '/', children }: Props) => (
  <RestrictedRoute redirectPath={redirectPath} isProtected={false}>
    {children}
  </RestrictedRoute>
)
