import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getProducts } from '@/app/entities/api'
import { ProductListPage } from '@/app/modules/product-list'
import { getQueryClient } from '@/pkg/rest-api'

export const revalidate = 3600

export default async function Products() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListPage />
    </HydrationBoundary>
  )
}
