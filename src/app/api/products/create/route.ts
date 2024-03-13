import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/auth-options'

export async function POST (req: Request) {
  const session = await getServerSession(authOptions)
  if (session === null) return Response.json({ success: false, message: 'No tienes permisos para realizar esta acción' }, { status: 401 })
  if (session.user.type !== 'admin' || session.user.status === false) return Response.json({ success: false, message: 'No tienes permisos para realizar esta acción' }, { status: 401 })
  const body = await req.json()

  const supabase = await createRouteHandlerClient({ cookies })
  const { error } = await supabase.from('products').insert([{ name: body.nameProduct, description: body.description, price: body.price, stock: body.stock, image: body.image }])

  if (error != null) return Response.json({ success: false, message: 'Error al crear el producto' }, { status: 500 })

  return Response.json({ sucess: true, message: 'Producto creado correctamente' })
}
