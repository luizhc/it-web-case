import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Collection } from '../enums/collections.enums';
import { Category } from '../models/category.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestoreService: FirestoreService) {}

  get(): Observable<Category[]> {
    return this.firestoreService.collection$(Collection.CATEGORIES, (query) =>
      query.orderBy('createdAt')
    );
  }

  getByUid(uid: string) {
    return this.firestoreService.doc$(`${Collection.CATEGORIES}/${uid}`);
  }

  getByName(description: string) {
    return this.firestoreService.col<Category>(Collection.CATEGORIES, (query) =>
      query.where('description', '==', description)
    );
  }

  create(data: Category) {
    return this.firestoreService.createOrUpdate(
      `${Collection.CATEGORIES}`,
      data
    );
  }

  update(uid: string, data: Category) {
    return this.firestoreService.createOrUpdate(
      `${Collection.CATEGORIES}/${uid}`,
      data
    );
  }

  delete(uid: string) {
    return this.firestoreService.delete(`${Collection.CATEGORIES}/${uid}`);
  }
}
