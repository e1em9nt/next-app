import { queryOptions, useQuery } from '@tanstack/react-query'

import { getProductById, getProducts } from './products.api'

// query options
export const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: getProducts,
  staleTime: 1000 * 60 * 60,
})

export const productQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['products', id],
    queryFn: ({ signal }) => getProductById(id, signal),
    staleTime: 1000 * 60 * 60,
  })
}

// hook
export const useProducts = () => {
  return useQuery(productsQueryOptions)
}

export const useProductById = (id: string) => {
  return useQuery(productQueryOptions(id))
}
