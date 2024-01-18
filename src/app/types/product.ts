export type ProductType = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// export type ProductDetailType = ProductType & {
//   relatedProducts: ProductType[];
// };

export type CreateProductType = Omit<ProductType, 'id'>;
