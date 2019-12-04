import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;

  constructor(private el: ElementRef) {
    setTimeout(() => {
      let precioConDecimales=this.el.nativeElement.innerHTML.split('$')[1];
      let precio=precioConDecimales.split(',')[0];
      if (precio >= 2000) {
        this.highlightColor = "red";
      }
      else if (precio > 1000&& precio< 1999) {
        this.highlightColor = "orange";
      }
      else {
        this.highlightColor = "lightgreen";
      }
      this.highlight(this.highlightColor || 'none');
    }, 10);
  }
  
  // @HostListener('mouseover', ['$event']) onMouseEnter() {
  //   if (this.el.nativeElement.innerHTML >= 15) {
  //     this.highlightColor = "lightgreen";
  //   }
  //   else if (this.el.nativeElement.innerHTML > 5 && this.el.nativeElement.innerHTML < 15) {
  //     this.highlightColor = "orange";
  //   }
  //   else {
  //     this.highlightColor = "red";
  //   }
  //   this.highlight(this.highlightColor || 'none');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight(null);
  // }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
