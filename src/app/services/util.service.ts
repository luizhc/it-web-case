import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertIcon } from 'sweetalert2';

import { Messages } from '../constants/messages.constants';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router: Router, private messageService: MessageService) {}

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

  getDateToday() {
    return new Date().toJSON().split('T')[0];
  }

  compareWithDescription(obj1: any, obj2: any) {
    return obj1 && obj2
      ? obj1.uid === obj2.uid && obj1.description === obj2.description
      : obj1 === obj2;
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
}
