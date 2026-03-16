import { ProductCard } from '@/app/features/product-card';
import { getProductById } from '@/app/entities/api/products/products.api';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-100px)] mx-8 sm:mx-10 md:mx-14 my-4">
      <div className="w-full lg:w-1/2 2xl:w-1/3">
        <ProductCard product={product} variant="detailed" />
      </div>
    </main>
  );
}
