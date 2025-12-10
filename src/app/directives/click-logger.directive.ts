import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]',
  standalone: true
})
export class ClickLoggerDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    console.log('Element clicked:', this.elementRef.nativeElement);
  }
}