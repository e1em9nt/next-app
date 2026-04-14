// utils
export const calculateOriginalPriceUtil = (currentPrice: number, discountPercentage: number): number => {
  if (discountPercentage <= 0 || discountPercentage >= 100) return currentPrice

  // return
  return currentPrice / (1 - discountPercentage / 100)
}
