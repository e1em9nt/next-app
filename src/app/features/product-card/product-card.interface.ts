import { Product } from '@/app/entities/models';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  variant?: 'detailed' | 'compact';
}
