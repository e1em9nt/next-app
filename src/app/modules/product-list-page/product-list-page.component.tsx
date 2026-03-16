'use client';

import { useProducts } from '@/app/entities/api/products';
import { ProductCard } from '@/app/features/product-card';
import { Product } from '@/app/shared/interfaces';

export const ProductListPage = () => {
  const { data: products = [] } = useProducts();

  return (
    <section className="mx-8 sm:mx-10 md:mx-12 my-6 sm:my-8 md:my-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product, index: number) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </section>
  );
};
