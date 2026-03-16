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
