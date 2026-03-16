import Image from 'next/image';
import { Card, CardContent } from '@/app/shared/ui/card';
import { Badge } from '@/app/shared/ui/badge';
import { useFormatter, useTranslations } from 'next-intl';
import { ProductCardProps } from './product-card.interface';
import { CardImageContainer } from '../card-image-container';
import { ProductCardAction } from '../card-action';

export const ProductCard = ({ product, priority, variant = 'compact' }: ProductCardProps) => {
  const formatCurrency = useFormatter();
  const t = useTranslations('Products.rating');

  const isCompact = variant === 'compact';

  return (
    <Card className="group h-full overflow-hidden shadow-none px-2">
      <CardContent className="space-y-3.5">
        <CardImageContainer isCompact={isCompact} href={`/products/${product.id}`}>
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
            priority={isCompact && priority}
            className={`${isCompact && 'transition-transform duration-300 group-hover:scale-105'} h-59.5 w-full object-contain`}
          />
        </CardImageContainer>
        <div className="flex items-center justify-between gap-1.5">
          <div className="text-foreground font-semibold text-lg">
            {formatCurrency.number(product.price, {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 2,
            })}
          </div>
          <Badge variant="secondary" className="sm:text-sm">
            {product.category}
          </Badge>
        </div>
        <h3 className={`${isCompact && 'line-clamp-2 h-13'} text-lg font-medium md:text-xl`}>
          {product.title}
        </h3>
        {!isCompact && <p className="text-muted-foreground">{product.description}</p>}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span>
              {t('rate')}: {product.rating.rate}
            </span>{' '}
            /{' '}
            <span>
              {t('count')}: {product.rating.count}
            </span>
          </div>
          <ProductCardAction isCompact={isCompact} href={`/products/${product.id}`} />
        </div>
      </CardContent>
    </Card>
  );
};
