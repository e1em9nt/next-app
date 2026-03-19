import { cache } from 'react';
import { envClient } from '@/config/env';
import { Product } from '@/app/shared/interfaces';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${envClient.NEXT_PUBLIC_API_URL}/products`);

  if (!response.ok) throw new Error('Failed to fetch products');

  return response.json();
};

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  // #region agent log
  const BASE_URL = 'https://refined-store.vercel.app';
  const url = `${BASE_URL}/api/products/${id}`;
  console.log('[DEBUG:a1bc1e] getProductById entry', JSON.stringify({id, url, apiUrlDefined: !!envClient.NEXT_PUBLIC_API_URL, hypothesisId: 'A,B,C,D'}));
  // #endregion

  const response = await fetch(url, {
    cache: 'no-store',
  }).catch((err: Error) => {
    // #region agent log
    console.error('[DEBUG:a1bc1e] fetch network error', JSON.stringify({id, url, error: err?.message, name: err?.name, hypothesisId: 'B'}));
    // #endregion
    throw err;
  });

  // #region agent log
  console.log('[DEBUG:a1bc1e] fetch completed', JSON.stringify({id, status: response.status, ok: response.ok, statusText: response.statusText, hypothesisId: 'A,C'}));
  // #endregion

  if (!response.ok) {
    // #region agent log
    console.error('[DEBUG:a1bc1e] non-ok response, returning null', JSON.stringify({id, status: response.status, hypothesisId: 'A'}));
    // #endregion
    return null;
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as Product;
  } catch {
    return null;
  }
});
