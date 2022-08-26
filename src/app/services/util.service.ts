import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SweetAlertIcon } from 'sweetalert2';

import { Messages } from '../constants/messages.constants';
import { APIs } from '../enums/apis.enums';
import { Collection } from '../enums/collections.enums';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private afs: AngularFirestore
  ) {}

  navigateByUrl(route: string) {
    this.router.navigateByUrl(route);
  }

  markAllFieldsAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsDirty();
        if (control instanceof FormGroup) {
          this.markAllFieldsAsDirty(control);
        }
      }
    });
    this.messageService.alertWithIcon(
      Messages.REQUIRED_FIELDS.TITLE,
      Messages.REQUIRED_FIELDS.TEXT,
      Messages.REQUIRED_FIELDS.ICON as SweetAlertIcon
    );
  }

  saveVisit(action: string) {
    this.httpClient
      .get<any[]>(APIs.GEOLOCATION)
      .subscribe((res: any) =>
        this.afs
          .collection(Collection.VISITS)
          .add({ ...res, action, createdAt: new Date() })
      );
  }

  getVisits() {
    return this.afs
      .collection(Collection.VISITS)
      .snapshotChanges()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((visits: any) => {
          return visits.map(
            (visit: { payload: { doc: { id: any; data: () => any } } }) => ({
              uid: visit.payload.doc.id,
              ...visit.payload.doc.data(),
            })
          );
        })
      );
  }
}
