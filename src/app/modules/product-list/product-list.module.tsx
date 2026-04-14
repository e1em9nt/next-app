'use client'

import { useTranslations } from 'next-intl'
import { type FC, useCallback } from 'react'

import { useProducts } from '@/app/entities/api'
import { ProductCardComponent } from '@/app/features/product-card'
import { useIntersection } from '@/app/shared/hooks'

// interface
interface IProps {}

// component
const ProductListModule: FC<Readonly<IProps>> = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts()

  const t = useTranslations('Products')

  const products = data?.pages.flatMap((page) => page.products) ?? []

  const handleIntersection = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // use intersection
  const { ref: intersectionRef } = useIntersection({
    onIntersect: handleIntersection,
  })

  // return
  return (
    <main className='mx-8 my-6 space-y-7 sm:mx-10 md:mx-12 md:my-8'>
      <h2 className='text-2xl font-semibold sm:text-3xl'>{t('heading')}</h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product, index) => (
          <ProductCardComponent key={product.id} product={product} imgPriority={index < 4} />
        ))}
      </div>

      <div ref={intersectionRef} className='py-10 text-center'>
        {isFetchingNextPage && <p className='text-muted-foreground text-sm'>{t('pagination.loading')}</p>}

        {!hasNextPage && products.length > 0 && <p className='text-muted-foreground text-sm'>{t('pagination.end')}</p>}
      </div>
    </main>
  )
}

export default ProductListModule
