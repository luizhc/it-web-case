import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;

export const newDate = new Date().toLocaleString();

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  collection$(path: string, query?: QueryFn): Observable<any[]> {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => ({
            uid: action.payload.doc.id,
            ...action.payload.doc.data(),
          }));
        })
      );
  }

  doc$(path: string): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return { uid: doc.payload.id, ...(doc.payload.data() as {}) };
        })
      );
  }

  /**
   * @param  {string} path 'collection' or 'collection/docID'
   * @param  {object} data new data
   *
   * Creates or updates data on a collection or document.
   **/
  updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter((v) => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data);
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   * @param  {string} path path to document
   *
   * Deletes document from Firestore
   **/
  delete(path: string) {
    return this.afs.doc(path).delete();
  }

  col<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  colWithId$<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const uid = a.payload.doc.id;
            return { uid, ...(data as any) };
          });
        })
      );
  }
}
