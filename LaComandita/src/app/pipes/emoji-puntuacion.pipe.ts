import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emojiPuntuacion'
})
export class EmojiPuntuacionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value <= 4) {
      return " 😡"
    }
    else if (value > 4 && value <= 12) {
      return " 😠"
    }
    else if (value > 12 && value <= 25) {
      return " 😐"
    }
    else if (value > 25 && value <= 35) {
      return " 🙂"
    }
    else {
      return " 😊"
    }
  }

}
