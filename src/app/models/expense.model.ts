import { Category } from './category.model';

export class Expense {
  uid?: string;
  name: string;
  value: number;
  category: Category;
  observation: string;
  createdAt?: string;
  updatedAt?: string;
}
