import { IProductDetails } from '@/app/entities/models'

export interface IProductCardProps {
  product: IProductDetails
  imgPriority?: boolean
  variant?: 'detailed' | 'compact'
}
