import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export async function POST (req: Request) {
  const body = await req.json()

  if (Object.values(body).length < 5) {
    return Response.json({ success: false, message: 'Campos requiridos' }, { status: 400 })
  }

  if (body.password !== body.confirmPassword) {
    return Response.json({ success: false, message: 'Las contraseñas no coinciden' }, { status: 400 })
  }

  const supabase = await createRouteHandlerClient({ cookies })
  const { data: user } = await supabase.from('users').select().eq('email', body.email).limit(1)

  if ((user?.length ?? 0) > 0) {
    return Response.json({ success: false, message: 'El correo electrónico ya está en uso' }, { status: 400 })
  }
  const hasPassword = await bcrypt.hash(body.password, 10)
  const { error } = await supabase.from('users').insert([{ email: body.email, password: hasPassword, username: body.username, type: 'user', status: true }])

  if (error != null) {
    return Response.json({ success: false, message: 'Error al crear el usuario' }, { status: 500 })
  }

  return Response.json({ sucess: true, message: 'Usuario creado Inicie session' })
}
