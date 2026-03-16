import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProducts } from '@/app/entities/api/products';
import { ProductListPage } from '@/app/modules/product-list-page';

const ONE_HOUR_MS: number = 60 * 60 * 1000;

export default async function Products() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ONE_HOUR_MS,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListPage />
    </HydrationBoundary>
  );
}
