import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickLoggerDirective } from '../directives/click-logger.directive';

@Component({
  selector: 'app-simple-click-example',
  standalone: true,
  imports: [CommonModule, ClickLoggerDirective],
  styleUrl: '../directives/directives.scss',
  template: `
    <div>
      <h3>Ejemplo Simple de clickLogger</h3>
      
      <div>
        <button appClickLogger class="simple-directive-btn">
          ¡Haz clic aquí!
        </button>
      </div>
    </div>
  `
})
export class SimpleClickExampleComponent {}
