import { cache } from 'react';
import { envClient } from '@/config/env';
import { Product } from '@/app/shared/interfaces';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch products');

  return response.json();
};

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Failed to fetch product');

  const text = await response.text();
  if (!text) return null;

  return JSON.parse(text) as Product;
});
