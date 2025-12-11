import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appConsoleLog]',
  standalone: true,
})
export class ConsoleLogDirective {
  constructor(private _elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    console.log('Element clicked:', this._elementRef.nativeElement);
  }
}
