export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// export type ProductDetailType = ProductType & {
//   relatedProducts: ProductType[];
// };

export type CreateProductType = Omit<ProductType, 'id' | 'rating'>;
