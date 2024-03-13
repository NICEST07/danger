'use client'

import { Button } from '@src/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@src/components/ui/card'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LoaderIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const supabase = createClientComponentClient()
const getData = async () => {
  const { data: products } = await supabase.from('products').select()
  return products
}

export default function HomePage () {
  useSession({ required: true })
  const { data, isLoading } = useSWR('products', getData)

  if (isLoading) return <LoaderIcon className='mx-auto w-12 h-12 animate-spin' />

  if (data?.length === 0) return <h1>No hay productos para mostrar</h1>

  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(220px,320px))] place-content-center gap-2'>
      {data?.map((product: any) => (
        <CardProduct
          key={product.id}
          id={product.id}
          name={product.name}
          description={product?.description}
          image={product.image}
          price={product.price}
          stock={product.stock}
        />

      ))}
    </section>
  )
}

function CardProduct ({ name, image, description, price, stock }: { name: string, image: string, description: string, price: number, id: string, stock: number }) {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP' }).format(price)
  console.log('image', image)

  return (
    <Card className='w-full max-w-xs rounded-lg border relative'>
      <div className='absolute w-8 h-8 text-center text-white font-bold truncate overflow-hidden top-2 right-2 bg-green-700 p-1 rounded-full shadow-xl'>{stock}</div>
      <div className='aspect-w-16 aspect-h-9 overflow-hidden rounded-t-md'>
        <img
          alt='Product image'
          className='object-cover'
          height='169'
          src={image}
          style={{
            aspectRatio: '300/169',
            objectFit: 'cover'
          }}
          width='100%'
        />
      </div>
      <CardHeader className='p-2'>
        <CardTitle className='text-sm font-bold'>{name} - {formattedPrice}</CardTitle>
        <CardDescription className='text-xs'>{description}</CardDescription>
      </CardHeader>
      <CardFooter className='p-2 flex justify-end gap-1'>
        <Button size='sm'>Comprar</Button>
      </CardFooter>
    </Card>
  )
}
