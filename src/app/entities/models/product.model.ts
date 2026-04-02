interface IProductListItem {
  id: number
  title: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  brand: string
  availabilityStatus: string
  thumbnail: string
}

interface IProductListResponse {
  products: IProductListItem[]
  total: number
  skip: number
  limit: number
}

interface IProductDetails extends IProductListItem {
  description: string
  warrantyInformation: string
  shippingInformation: string
  returnPolicy: string
  minimumOrderQuantity: number
}

export type { IProductDetails, IProductListItem, IProductListResponse }
