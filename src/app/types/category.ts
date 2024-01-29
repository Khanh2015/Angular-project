export type CategoryType = {
  _id: string;
  name: string;
};

export type CreateCategoryType = Omit<CategoryType, ' _id'>;
