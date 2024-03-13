import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@src/styles/globals.css'
import { NextAuthProvider } from '@src/context/session-provider'
import { Toaster } from 'sonner'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata: Metadata = {
  title: 'Nombre Lorem',
  description: 'Proyecto de lorena'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster richColors position='top-center' />
      </body>
    </html>
  )
}
