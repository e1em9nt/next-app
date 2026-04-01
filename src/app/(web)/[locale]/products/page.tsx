import { type NextPage } from 'next'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { productsQueryOptions } from '@/app/entities/api'
import { ProductListModule } from '@/app/modules/product-list'
import { getQueryClient } from '@/pkg/rest-api'

// revalidate
export const revalidate = 3600

// interface
interface IProps {}

// component
const Page: NextPage<Readonly<IProps>> = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(productsQueryOptions)

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListModule />
    </HydrationBoundary>
  )
}

export default Page
