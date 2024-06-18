import { onLoginUser } from '@/actions/auth'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    
    <div>OwnerLayout</div>
  )
}

export default OwnerLayout
