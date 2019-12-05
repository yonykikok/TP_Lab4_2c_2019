import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPuntuacion'
})
export class ColorPuntuacionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
