import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { getProductById, getProducts } from './products.api'

// query options
export const productListQueryOptions = infiniteQueryOptions({
  queryKey: ['products'],
  queryFn: ({ pageParam, signal }) => getProducts(pageParam as number, signal),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    const nextSkip = lastPage.skip + lastPage.limit
    return nextSkip < lastPage.total ? nextSkip : undefined
  },
})

export const productQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProductById(id, signal),
  })
}

// hooks
export const useProducts = () => {
  return useInfiniteQuery(productListQueryOptions)
}

export const useProductById = (id: string) => {
  return useQuery(productQueryOptions(id))
}
