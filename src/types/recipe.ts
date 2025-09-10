type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  sku: string;
  tags: string[];
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  reviews: any[];
};
