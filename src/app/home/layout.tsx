import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/auth-options'
import { SignOutButton } from '@src/components/signout'
import { CreateProduct } from '@src/components/create-product'

export default async function HomeLayout ({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <>
      <header className='h-14 flex items-center px-4 border-b lg:h-16 xl:px-6 mb-5'>
        <div className='flex items-center gap-4'>
          <img
            alt='Avatar'
            className='rounded-full'
            height='28'
            src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
            style={{
              aspectRatio: '28/28',
              objectFit: 'cover'
            }}
            width='28'
          />
          <div className='text-sm font-semibold'>{session?.user.username}</div>
        </div>
        <div className='ml-auto flex gap-3'>
          {session?.user.type === 'admin' && <CreateProduct />}
          <SignOutButton />
        </div>
      </header>
      {children}
    </>
  )
}
