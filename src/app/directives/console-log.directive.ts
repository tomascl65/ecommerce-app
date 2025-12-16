import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Interface para tipado específico de datos de logging
interface LogData {
  [key: string]: string | number | boolean | object | null | undefined;
}

@Directive({
  selector: '[appConsoleLog]',
  standalone: true,
})
export class ConsoleLogDirective {
  constructor(private _elementRef: ElementRef) {}

  @Input('appConsoleLog') message: string = 'Element clicked';

  @HostListener('click') onClick() {
    console.log(this.message, {
      timestamp: new Date().toISOString(),
      element: this._elementRef.nativeElement.tagName,
      className: this._elementRef.nativeElement.className,
    });
  }

  // Método para logging programático
  logCustomMessage(message: string, data?: LogData): void {
    console.log(message, {
      timestamp: new Date().toISOString(),
      element: this._elementRef.nativeElement.tagName,
      className: this._elementRef.nativeElement.className,
      customData: data,
    });
  }
}
