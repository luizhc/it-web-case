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

  castTimestampFirebaseToDate(timestamp: any): string {
    let date = '-';
    if (timestamp) {
      const fireBaseTime = new Date(timestamp.toDate());
      date = fireBaseTime.toLocaleString();
    }

    return date;
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

  getOnlyNumbers(value: string): string {
    if (value) {
      value = value.replace(/\D/g, ''); // remove caracteres
    }
    return value;
  }

  convertToMoney(value: string | number, ignoreSymbol = false): string {
    value = String(value);
    if (value) {
      value = value.replace(/,/, '.'); // replace comma with dot, ex: 345,12 to 345.12
      value = parseFloat(value).toFixed(2); // fix two decimal places after the comma, ex: 345.1 to 345.10
      value = this.getOnlyNumbers(value);
      // extract real and cents in number
      const number = parseFloat(
        `${value.substring(0, value.length - 2)}.${value.slice(-2)}`
      );
      // convert to pt-BR and currency BRL
      value = Number(number.toFixed(2)).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      if (ignoreSymbol) {
        value = value.replace('R$', '').trim(); // remove R$
      }
    }

    return value;
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
