import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'

import { Badge } from '@/pkg/theme/ui/badge'
import { Card, CardContent } from '@/pkg/theme/ui/card'

import { CardImageContainerComponent, ProductCardActionComponent } from './elements'
import { IProductCardProps } from './product-card.interface'

const ProductCardComponent = (props: IProductCardProps) => {
  const { product, imgPriority, variant = 'compact' } = props

  const formatCurrency = useFormatter()
  const t = useTranslations('Products.rating')

  const isCompact = variant === 'compact'

  return (
    <Card className='group h-full overflow-hidden px-2 shadow-none'>
      <CardContent className='space-y-3.5'>
        <CardImageContainerComponent isCompact={isCompact} href={`/products/${product.id}`}>
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
            quality={60}
            priority={!isCompact || imgPriority}
            className={`${isCompact && 'transition-transform duration-300 group-hover:scale-105'} h-59.5 w-full object-contain`}
          />
        </CardImageContainerComponent>

        <div className='flex items-center justify-between gap-1.5'>
          <div className='text-foreground text-lg font-semibold'>
            {formatCurrency.number(product.price, {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 2,
            })}
          </div>

          <Badge variant='secondary' className='sm:text-sm'>
            {product.category}
          </Badge>
        </div>

        <h3 className={`${isCompact && 'line-clamp-2 h-13'} text-lg font-medium md:text-xl`}>{product.title}</h3>

        {!isCompact && <p className='text-muted-foreground'>{product.description}</p>}

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <span>
              {t('rate')}: {product.rating.rate}
            </span>{' '}
            /{' '}
            <span>
              {t('count')}: {product.rating.count}
            </span>
          </div>

          <ProductCardActionComponent isCompact={isCompact} href={`/products/${product.id}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCardComponent
