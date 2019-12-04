import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propina'
})
export class PropinaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value > 0) {
      return ' 🤑 Propina: $' + value + ',00';


    } else {

      return '🐀 Propina: $' + value + ',00';
    }
  }

}
