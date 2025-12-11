import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleLogDirective } from '../directives/console-log.directive';

@Component({
  selector: 'app-test-click-directive',
  standalone: true,
  imports: [CommonModule, ConsoleLogDirective],
  template: `
    <div>
      <h2>Prueba de la Directiva consoleLog</h2>

      <div>
        <h3>Ejemplos de uso de la directiva:</h3>

        <div>
          <button appConsoleLog class="demo-btn primary">Botón Principal - Da clic aquí</button>

          <button appConsoleLog class="demo-btn secondary">
            Botón Secundario - Clic para probar
          </button>

          <button appConsoleLog class="demo-btn success">Botón de Éxito - Pruébame</button>
        </div>
      </div>

      <div>
        <h3>Elemento con directiva en texto:</h3>
        <p>
          Este es un texto normal, pero
          <span appConsoleLog class="clickable-text">esta parte es cliqueable</span>
          y también registra clics.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.1s ease;
      }

      .demo-btn.primary {
        background-color: #007bff;
        color: white;
      }

      .demo-btn.secondary {
        background-color: #6c757d;
        color: white;
      }

      .demo-btn.success {
        background-color: #28a745;
        color: white;
      }

      .clickable-text {
        color: #dc3545;
        font-weight: bold;
        cursor: pointer;
        text-decoration: underline;
        padding: 2px 4px;
        border-radius: 3px;
        transition: background-color 0.2s ease;
      }
    `,
  ],
})
export class TestClickDirectiveComponent {}
