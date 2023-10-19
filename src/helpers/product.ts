import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const percentage = Number(product.basePrice) * (product.discountPercentage / 100);

  const totalPrice = Number(product.basePrice) - percentage
    
  return {
    ...product,
    totalPrice,
  };
};
