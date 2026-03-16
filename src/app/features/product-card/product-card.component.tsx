import Image from 'next/image';
import { Link } from '@/pkg/libraries/locale';
import { Card, CardContent } from '@/app/shared/ui/card';
import { Badge } from '@/app/shared/ui/badge';
import { ArrowRightIcon } from 'lucide-react';
import { buttonVariants } from '@/app/shared/ui';
import { cn } from '@/pkg/utils/cn';
import { useFormatter, useTranslations } from 'next-intl';
import { ProductCardProps } from './product-card.interface';

export const ProductCard = ({ product, priority }: ProductCardProps) => {
  const formatCurrency = useFormatter();
  const t = useTranslations('Products.rating');

  return (
    <Card className="group h-full overflow-hidden shadow-none px-2">
      <CardContent className="space-y-3.5">
        <Link
          href={`/products/${product.id}`}
          className="mb-6 block overflow-hidden rounded-lg sm:mb-12"
        >
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
            priority={priority}
            className="h-59.5 w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
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
        <h3 className="line-clamp-2 h-13 text-lg font-medium md:text-xl">{product.title}</h3>
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
          <Link
            href={`/products/${product.id}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'ml-auto group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground transition-colors duration-300',
            )}
          >
            <ArrowRightIcon className="size-4 -rotate-45" />
            <span className="sr-only">Read more: {product.title}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
