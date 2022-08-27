import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Collection } from '../enums/collections.enums';
import { Category } from '../models/category.model';
import { DbService, newDate } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private afs: AngularFirestore, private dbService: DbService) {}

  getAll(): Observable<Category[]> {
    return this.dbService.collection$(Collection.CATEGORIES, (query) =>
      query.orderBy('createdAt')
    );
  }

  getByUid(uid: string) {
    return this.afs.doc<Category>(`${Collection.CATEGORIES}/${uid}`);
  }

  getByName(description: string) {
    return this.dbService.colWithId$<Category>(Collection.CATEGORIES, (ref) =>
      ref.where('description', '==', description)
    );
  }

  add(data: any) {
    return this.afs
      .collection(Collection.CATEGORIES)
      .add({ ...data, createdAt: newDate, updatedAt: newDate });
  }

  update(uid: string, data: any) {
    return this.getByUid(uid).set(
      { ...data, updatedAt: newDate },
      { merge: true }
    );
  }

  delete(uid: string) {
    return this.getByUid(uid).delete();
  }
}
