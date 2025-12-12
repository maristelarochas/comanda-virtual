export interface Product {
  id: number;
  name: string;
  hasSmall: boolean;
  hasMedium: boolean;
  hasLarge: boolean;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  size: "small" | "medium" | "large";
  quantity: number;
  price: number;
  observations?: string;
}
