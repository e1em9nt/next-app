import { cache } from 'react'

import { Product } from '@/app/entities/models'
import { envClient } from '@/config/env'

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products`)

  if (!response.ok) throw new Error('Failed to fetch products')

  return response.json()
}

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) return null

  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as Product
  } catch {
    return null
  }
})
