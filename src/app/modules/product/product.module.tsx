import { type IProduct } from '@/app/entities/models'
import { ProductCardComponent } from '@/app/features/product-card'

function ProductModule({ product }: { product: IProduct }) {
  return (
    <main className='mx-8 my-4 flex min-h-[calc(100vh-100px)] items-center justify-center sm:mx-10 md:mx-14'>
      <div className='w-full lg:w-1/2 2xl:w-1/3'>
        <ProductCardComponent product={product} variant='detailed' />
      </div>
    </main>
  )
}

export default ProductModule
