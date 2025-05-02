
export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  steps: string[];
  cuisine: string;
  tags: string[];
  prepTime: number;
  author?: string;
  createdAt?: string;
}
