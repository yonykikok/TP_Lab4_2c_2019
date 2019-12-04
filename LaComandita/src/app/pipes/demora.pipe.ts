import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demora'
})
export class DemoraPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value+" minutos.";
  }

}
