import { IProduct } from '@/app/entities/models'

export interface IProductCardProps {
  product: IProduct
  priority?: boolean
  variant?: 'detailed' | 'compact'
}
