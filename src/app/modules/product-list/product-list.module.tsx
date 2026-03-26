'use client'

import { useTranslations } from 'next-intl'

import { useProducts } from '@/app/entities/api'
import { ProductCardComponent } from '@/app/features/product-card'
import { useRequireAuth } from '@/app/shared/hooks'

const ProductListModule = () => {
  const { isAuthenticated } = useRequireAuth()
  const { data: products = [] } = useProducts()

  const t = useTranslations('Products')

  if (!isAuthenticated) return null

  return (
    <main className='mx-8 my-6 space-y-7 sm:mx-10 md:mx-12 md:my-8'>
      <h2 className='text-3xl font-semibold'>{t('heading')}</h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product, index: number) => (
          <ProductCardComponent key={product.id} product={product} imgPriority={index < 4} />
        ))}
      </div>
    </main>
  )
}

export default ProductListModule
