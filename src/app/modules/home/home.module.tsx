import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import bgImage from '@/app/shared/assets/icon/main-bg.png'

import { ViewProductsButtonComponent } from './elements'

async function HomeModule() {
  const translations = await getTranslations('HomePage')

  return (
    <main className='relative h-[calc(100vh-64px)] overflow-hidden px-5'>
      <Image
        src={bgImage}
        alt='Minimalistic Background'
        fill
        priority
        placeholder='blur'
        className='-z-10 object-cover'
      />
      <div className='flex h-full flex-col items-center justify-center gap-10 font-sans'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h1 className='text-2xl font-bold text-gray-700 sm:text-3xl md:text-4xl'>{translations('heading')}</h1>
          <p className='text-center text-sm text-gray-700 sm:w-1/2 sm:text-base'>{translations('description')}</p>
        </div>
        <ViewProductsButtonComponent />
      </div>
    </main>
  )
}

export default HomeModule
