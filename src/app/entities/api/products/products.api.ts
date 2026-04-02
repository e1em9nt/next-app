import { IProductDetails, IProductListResponse } from '@/app/entities/models'
import { envClient } from '@/config/env'

// constant
const REQUEST_LIMIT = 20
const PRODUCTS_SELECT = [
  'id',
  'title',
  'category',
  'price',
  'discountPercentage',
  'rating',
  'brand',
  'availabilityStatus',
  'thumbnail',
]

// fetchers
export const getProducts = async (skip: number, signal?: AbortSignal): Promise<IProductListResponse> => {
  const response = await fetch(
    `${envClient.NEXT_PUBLIC_API_URL}/products?limit=${REQUEST_LIMIT}&skip=${skip}&select=${PRODUCTS_SELECT.map((item) => item.trim()).join(',')}`,
    {
      next: { tags: ['products'] },
      signal,
    },
  )

  if (!response.ok) throw new Error('Failed to fetch products')

  return response.json()
}

export const getTopProductIds = async (): Promise<{ id: number }[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products?limit=${REQUEST_LIMIT}&skip=0&select=id`, {
    next: { tags: ['products'] },
  })

  if (!response.ok) return []

  const data: IProductListResponse = await response.json()

  return data.products
}

export const getProductById = async (id: string, signal?: AbortSignal): Promise<IProductDetails | null> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['products', `product-${id}`] },
    signal,
  })

  if (!response.ok) return null

  return response.json()
}
