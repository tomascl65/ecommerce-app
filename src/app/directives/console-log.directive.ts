import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appConsoleLog]',
  standalone: true
})
export class ConsoleLogDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    console.log('Element clicked:', this.elementRef.nativeElement);
  }
}