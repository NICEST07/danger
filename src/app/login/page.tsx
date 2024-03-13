'use client'
import { Label } from '@radix-ui/react-label'
import { Button } from '@src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card'
import { Input } from '@src/components/ui/input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage () {
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget))
    if (email === '' || password === '') return
    const res = await signIn('credentials', { email, password, callbackUrl: '/home' })
    console.log(res)
  }

  return (
    <div className='flex h-dvh justify-center items-center bg-black/20 relative'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Iniciar sesión</CardTitle>
          <CardDescription>Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Correo electrónico</Label>
              <Input id='email' name='email' placeholder='m@example.com' required type='email' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Contraseña</Label>
                <Link className='ml-auto inline-block text-sm underline' href='#'>
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <Input id='password' name='password' required type='password' />
            </div>
            <Button className='w-full' type='submit'>
              Iniciar sesión
            </Button>
            <Button type='button' className='w-full' onClick={async () => router.push('/register')} variant='outline'>
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}
