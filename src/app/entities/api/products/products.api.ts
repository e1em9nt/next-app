import { IProduct } from '@/app/entities/models'
import { envClient } from '@/config/env'

export const getProducts = async ({ signal }: { signal?: AbortSignal } = {}): Promise<IProduct[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products`, { next: { tags: ['products'] }, signal })

  if (!response.ok) throw new Error('Failed to fetch products')

  return response.json()
}

export const getProductById = async (id: string, signal?: AbortSignal): Promise<IProduct | null> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 3600, tags: ['products', `product-${id}`] },
    signal,
  })

  if (!response.ok) return null

  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as IProduct
  } catch {
    return null
  }
}
