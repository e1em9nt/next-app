import { IProductListItem } from '@/app/entities/models'

export interface IProductCardProps {
  product: IProductListItem
  imgPriority?: boolean
  variant?: 'detailed' | 'compact'
}
