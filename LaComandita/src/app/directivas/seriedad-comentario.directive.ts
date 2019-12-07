import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSeriedadComentario]'
})
export class SeriedadComentarioDirective {
  @Input('appSeriedadComentario') highlightColor: string;

  constructor(private el: ElementRef) {
    setTimeout(() => {

      let value = this.el.nativeElement.innerHTML;
      if (value.includes("😡")) {

        this.highlightColor = "red";
      }
      else if (value.includes("😠")) {

        this.highlightColor = "orange";
      }
      else if (value.includes("😐")) {

        this.highlightColor = "gray";
      }
      else if (value.includes("🙂")) {

        this.highlightColor = "lightgreen";
      }
      else {
        "😊"
        this.highlightColor = "green";

      }
      this.highlight(this.highlightColor || 'none');
    }, 30);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }


}
