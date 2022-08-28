import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from './../services/util.service';

@Pipe({
  name: 'timestampToDate',
})
export class TimestampToDatePipe implements PipeTransform {
  constructor(private utilService: UtilService) {}

  transform(value: unknown): string {
    return this.utilService.castTimestampFirebaseToDate(value);
  }
}
