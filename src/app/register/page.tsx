'use client'
import { Button } from '@src/components/ui/button'
import { Checkbox } from '@src/components/ui/checkbox'
import { Input } from '@src/components/ui/input'
import { Label } from '@src/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RegisterPage () {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    if (Object.values(values).length < 5) return

    const res = await fetch('/api/newUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const result = await res.json()
    if (result.success === false) return toast.error(result?.message ?? 'Error al crear el usuario')
    toast.success(result.message)
    router.push('/login')
  }

  return (
    <div className='py-6 space-y-6 flex items-center h-dvh'>
      <form onSubmit={handleSubmit} className='mx-auto max-w-3xl space-y-4 px-4'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Crear una cuenta</h1>
          <p className='text-gray-500 dark:text-gray-400'>Ingresa tu información para comenzar</p>
        </div>
        <div className='space-y-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Usuario</Label>
              <Input id='name' required name='username' placeholder='Ingresa tu Usuario' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Correo electrónico</Label>
              <Input id='email' required name='email' placeholder='Ingresa tu correo electrónico' type='email' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input id='password' required name='password' placeholder='Ingresa tu contraseña' type='password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirm-password'>Confirmar Contraseña</Label>
                <Input required id='confirm-password' name='confirmPassword' placeholder='Confirma tu contraseña' type='password' />
              </div>
            </div>
            <div className='space-y-2'>
              <Checkbox required id='terms' name='terms' />
              <Label className='ml-2 text-sm leading-none' htmlFor='terms'>
                Acepto los
                <Link className='underline underline-offset-[2px]' href='#'>
                  Términos y Condiciones
                </Link>
              </Label>
            </div>
          </div>
          <Button type='submit' className='w-full'>
            Registrarse
          </Button>
          <Button variant='outline' onClick={() => router.push('/login')} type='button' className='w-full'>
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  )
}
