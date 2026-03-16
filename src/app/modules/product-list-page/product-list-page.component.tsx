'use client';

import { useTranslations } from 'next-intl';
import { useProducts } from '@/app/entities/api/products';
import { ProductCard } from '@/app/features/product-card';

export const ProductListPage = () => {
  const { data: products = [] } = useProducts();
  const t = useTranslations('Products');

  return (
    <main className="mx-8 sm:mx-10 md:mx-12 my-6 md:my-8 space-y-7">
      <h2 className="text-3xl font-semibold">{t('heading')}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index: number) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </main>
  );
};
