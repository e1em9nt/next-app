import { cache } from 'react'

import { IProduct } from '@/app/entities/models'
import { envClient } from '@/config/env'

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products`)

  if (!response.ok) throw new Error('Failed to fetch products')

  return response.json()
}

export const getProductById = cache(async (id: string): Promise<IProduct | null> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) return null

  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as IProduct
  } catch {
    return null
  }
})
