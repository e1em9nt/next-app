import { CircleCheckBig, PackagePlus, RefreshCw, Truck } from 'lucide-react'
import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'
import { type FC } from 'react'

import { type IProductDetails } from '@/app/entities/models'
import { Badge } from '@/pkg/theme/ui/badge'
import { Card, CardContent } from '@/pkg/theme/ui/card'

import { CardImageContainerComponent, ExpandedCardListItemComponent, ProductCardActionComponent } from './elements'
import { IProductCardProps } from './product-card.interface'
import { calculateOriginalPriceUtil } from './product-card.utils'

// component
const ProductCardComponent: FC<Readonly<IProductCardProps>> = (props: IProductCardProps) => {
  const { product, imgPriority, variant = 'compact' } = props

  const formatCurrency = useFormatter()
  const t = useTranslations('Product')

  const isCompact = variant === 'compact'
  const hasDiscount = product.discountPercentage > 0

  const originalPrice = calculateOriginalPriceUtil(product.price, product.discountPercentage)

  // return
  return (
    <Card className='group h-full overflow-hidden px-2 shadow-none'>
      <CardContent className='space-y-3.5 sm:space-y-4.5'>
        <CardImageContainerComponent isCompact={isCompact} href={`/products/${product.id}`}>
          <Image
            width={500}
            height={500}
            src={product.thumbnail}
            alt={product.title}
            quality={60}
            priority={!isCompact || imgPriority}
            className={`${isCompact && 'transition-transform duration-300 group-hover:scale-105'} h-59.5 w-full object-contain`}
          />

          {product.availabilityStatus?.toLowerCase() !== 'in stock' && (
            <div className='text-foreground absolute bottom-2 left-0 rounded-r-sm bg-yellow-400 px-4 py-0.5 text-xs'>
              {product.availabilityStatus}
            </div>
          )}
        </CardImageContainerComponent>

        <div className='flex items-center justify-between gap-1.5'>
          <div className='flex items-center gap-2'>
            <div className={`${hasDiscount ? 'text-red-500' : 'text-foreground'} text-lg font-semibold`}>
              {formatCurrency.number(product.price, {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
              })}
            </div>

            {hasDiscount && (
              <div className='text-muted-foreground text-lg line-through'>
                {formatCurrency.number(originalPrice, {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                })}
              </div>
            )}
          </div>

          <Badge variant='secondary' className='md:text-sm'>
            {product.category}
          </Badge>
        </div>

        <div className='space-y-2'>
          {product.brand && <h3 className='text-lg font-bold uppercase lg:text-xl'>{product.brand}</h3>}

          <h4 className={`${isCompact && 'line-clamp-2 h-13'} text-base font-medium sm:text-lg lg:text-xl`}>
            {product.title}
          </h4>
          {!isCompact && <p className='text-muted-foreground'>{(product as IProductDetails).description}</p>}
        </div>

        {!isCompact && (
          <ul className='text-muted-foreground space-y-1.5 border-y py-2'>
            <ExpandedCardListItemComponent icon={PackagePlus}>
              Minimum Order Quantity: {(product as IProductDetails).minimumOrderQuantity}
            </ExpandedCardListItemComponent>

            <ExpandedCardListItemComponent icon={CircleCheckBig}>
              {(product as IProductDetails).warrantyInformation}
            </ExpandedCardListItemComponent>

            <ExpandedCardListItemComponent icon={RefreshCw}>
              {(product as IProductDetails).returnPolicy}
            </ExpandedCardListItemComponent>

            <ExpandedCardListItemComponent icon={Truck}>
              {(product as IProductDetails).shippingInformation}
            </ExpandedCardListItemComponent>
          </ul>
        )}

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='text-muted-foreground md:text-base'>
            {t('rating')}: <span className='text-foreground'>{product.rating} / 5</span>
          </div>

          <ProductCardActionComponent isCompact={isCompact} href={`/products/${product.id}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCardComponent
