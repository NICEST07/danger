'use client'

import { CirclePlus } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'
import { getSession } from 'next-auth/react'
import { mutate } from 'swr'

export function CreateProduct () {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.currentTarget))
    if (Object.values(values).some(value => value === '')) return toast.error('Todos los campos son requeridos')
    const session = await getSession()
    if (session?.user.type !== 'admin' || session.user.status === false) return toast.error('No tienes permisos para realizar esta acción')
    const response = await fetch('/api/products/create', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.success === false) return toast.error(data.message)
    toast.success('Producto creado')
    mutate('products')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='rounded-full'>
          Crear Producto
          <CirclePlus className='ml-2 w-5 h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Crear Producto</DialogTitle>
          <DialogDescription>Ingresa los detalles del nuevo producto.</DialogDescription>
        </DialogHeader>
        <form action='' onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label className='text-sm' htmlFor='name'>
                Nombre
              </Label>
              <Input id='name' name='nameProduct' placeholder='Ingresa el nombre del producto' />
            </div>
            <div className='grid gap-2'>
              <Label className='text-sm' htmlFor='description'>
                Descripción
              </Label>
              <Textarea name='description' className='min-h-[100px]' id='description' placeholder='Ingresa la descripción del producto' />
            </div>
            <div className='grid gap-2'>
              <Label className='text-sm' htmlFor='price'>
                Precio
              </Label>
              <Input id='price' name='price' placeholder='Ingresa el precio' type='number' />
            </div>
            <div className='grid gap-2'>
              <Label className='text-sm' htmlFor='quantity'>
                Cantidad
              </Label>
              <Input id='quantity' name='stock' placeholder='Ingresa la cantidad' type='number' />
            </div>
            <div className='grid gap-2'>
              <Label className='text-sm' htmlFor='image'>
                URL Imagen
              </Label>
              <Input id='image' name='image' placeholder='Ingresa la URL de la imagen' type='url' />
            </div>
          </div>
          <DialogFooter className='mt-3'>
            <Button type='submit'>Crear</Button>
            <div>
              <Button variant='outline'>Cancelar</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
