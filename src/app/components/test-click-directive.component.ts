import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickLoggerDirective } from '../directives/click-logger.directive';

@Component({
  selector: 'app-test-click-directive',
  standalone: true,
  imports: [CommonModule, ClickLoggerDirective],
  template: `
    <div>
      <h2>Prueba de la Directiva clickLogger</h2>
      
      <div>
        <h3>Ejemplos de uso de la directiva:</h3>
        
        <div>
          <button appClickLogger class="demo-btn primary">
            Botón Principal - Haz clic aquí
          </button>
          
          <button appClickLogger class="demo-btn secondary">
            Botón Secundario - Click para probar
          </button>
          
          <button appClickLogger class="demo-btn success">
            Botón de Éxito - Pruébame
          </button>
        </div>
      </div>
      
      <div>
        <h3>Elemento con directiva en texto:</h3>
        <p>
          Este es un texto normal, pero 
          <span appClickLogger class="clickable-text">esta parte es clickeable</span>
          y también registra clicks.
        </p>
      </div>
    </div>
  `,
  styles: [`
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
  `]
})
export class TestClickDirectiveComponent {}