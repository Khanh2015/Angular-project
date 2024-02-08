export type CategoryType = {
  _id: string;
  name: string;
  quantity: number;
};

export type CreateCategoryType = Omit<CategoryType, ' _id'>;
