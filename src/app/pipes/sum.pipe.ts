import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    const sum = items.reduce((a, b) => a + b[attr], 0);
    return sum ? sum : 0;
  }
}
