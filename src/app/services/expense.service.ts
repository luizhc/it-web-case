import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../enums/collections.enums';
import { Expense } from '../models/expense.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private firestoreService: FirestoreService) {}

  get(): Observable<Expense[]> {
    return this.firestoreService
      .collection$(Collection.EXPENSES, (query) => query.orderBy('createdAt'))
      .pipe(
        this.firestoreService.leftJoinDocument(
          'category',
          Collection.CATEGORIES
        )
      );
  }

  create(data: Expense) {
    return this.firestoreService.createOrUpdate(`${Collection.EXPENSES}`, data);
  }

  update(uid: string, data: Expense) {
    return this.firestoreService.createOrUpdate(
      `${Collection.EXPENSES}/${uid}`,
      data
    );
  }

  delete(uid: string) {
    return this.firestoreService.delete(`${Collection.EXPENSES}/${uid}`);
  }
}
