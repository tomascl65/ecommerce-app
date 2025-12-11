import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleLogDirective } from '../directives/console-log.directive';

@Component({
  selector: 'app-simple-click-example',
  standalone: true,
  imports: [CommonModule, ConsoleLogDirective],
  template: `
    <div>
      <h3>Ejemplo Simple de consoleLog</h3>

      <div>
        <button appConsoleLog class="simple-btn">¡Da clic aquí!</button>
      </div>
    </div>
  `,
  styles: [
    `
      .simple-btn {
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        background-color: #17a2b8;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 15px;
      }
    `,
  ],
})
export class SimpleClickExampleComponent {}
