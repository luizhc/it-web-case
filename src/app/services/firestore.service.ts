import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryFn,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { combineLatest, defer, map, Observable, of, switchMap } from 'rxjs';
import { Collection } from '../enums/collections.enums';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  // firebase server timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  collection$<T>(
    ref: CollectionPredicate<T>,
    query?: QueryFn
  ): Observable<T[]> {
    return this.col(ref, query)
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
  createOrUpdate(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter((v) => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs
        .collection(path)
        .add({ ...data, createdAt: this.timestamp });
    } else {
      // Even is always document
      return this.afs
        .doc(path)
        .set({ ...data, updatedAt: this.timestamp }, { merge: true });
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

  leftJoinDocument =
    (fieldToJoin: string, collection: Collection) =>
    <T>(source: Observable<T[]>) =>
      defer(() => {
        // Operator state
        let collectionData: any;
        const cache = new Map();

        return source.pipe(
          switchMap((data) => {
            // Clear mapping on each emitted val ;
            cache.clear();

            // Save the parent data state
            collectionData = data as any[];

            const reads$ = [];
            let i = 0;
            for (const doc of collectionData) {
              // Skip if doc field does not exist or is already in cache
              if (!doc[fieldToJoin] || cache.get(doc[fieldToJoin])) {
                continue;
              }

              // Push doc read to Array
              reads$.push(this.doc$(`${collection}/${doc[fieldToJoin]}`));
              cache.set(doc[fieldToJoin], i);
              i++;
            }

            return reads$.length ? combineLatest(reads$) : of([]);
          }),
          map((joins) => {
            return collectionData.map((v: any, i: any) => {
              const joinIndex = cache.get(v[fieldToJoin]);
              return { ...v, [fieldToJoin]: joins[joinIndex] || null };
            });
          })
          // tap(final =>
          //     console.log(
          //         `Queried ${(final as any).length}, Joined ${cache.size} docs`
          //     )
          // )
        );
      });
}
