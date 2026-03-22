import { Product } from '@/app/shared/interfaces';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  variant?: 'detailed' | 'compact';
}
