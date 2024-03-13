'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export const SignOutButton = () => {
  return (
    <Button onClick={async () => await signOut()} className='rounded-full h-9'>
      Salir
      <LogOut className='ml-2 w-4 h-4' />
    </Button>
  )
}
