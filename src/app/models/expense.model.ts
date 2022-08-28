import { Category } from './category.model';

export class Expense {
  uid?: string;
  name: string;
  category: Category;
  date: Date;
  value: number;
  observation: string;
  createdAt?: string;
  updatedAt?: string;
}
