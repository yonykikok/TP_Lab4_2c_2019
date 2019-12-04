import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return "$" + value + ",00";
  }

}
