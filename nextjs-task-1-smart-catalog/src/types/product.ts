// TypeScript перевіряє, щоб кожен товар мав правильну структуру.
export type ProductCategory = "Електроніка" | "Дім" | "Спорт" | "Аксесуари";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  inStock: boolean;
  emoji: string;
  description: string;
}
