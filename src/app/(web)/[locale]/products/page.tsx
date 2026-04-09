import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { productListQueryOptions } from '@/app/entities/api'
import { ProductListModule } from '@/app/modules/product-list'
import { type ILocaleParamsProps } from '@/app/shared/interfaces'
import { getQueryClient } from '@/pkg/rest-api'

// revalidate
export const revalidate = 3600

// interface
interface IProps extends ILocaleParamsProps {}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props
  const { locale } = await params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery(productListQueryOptions)

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListModule />
    </HydrationBoundary>
  )
}

export default Page
