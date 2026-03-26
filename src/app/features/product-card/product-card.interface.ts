import { IProduct } from '@/app/entities/models'

export interface IProductCardProps {
  product: IProduct
  imgPriority?: boolean
  variant?: 'detailed' | 'compact'
}
