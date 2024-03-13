import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo electrónico', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize (credentials, req) {
        try {
          const supabase = await createRouteHandlerClient({ cookies })
          const { data: user } = await supabase.from('users').select().eq('email', credentials?.email).limit(1)
          if (user?.length === 0 && user == null) {
            throw new Error('El usuario no existe')
          }
          const { password, status, ...rest } = user?.[0] ?? { password: '', status: false }
          if (status === false) {
            throw new Error('El usuario no está activo')
          }

          const comparate = await bcrypt.compare(credentials?.password ?? '', password)

          if (!comparate) {
            throw new Error('Contraseña incorrecta')
          }
          return { ...rest, status }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      return { ...token, ...user }
    },
    async session ({ session, token }) {
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}
