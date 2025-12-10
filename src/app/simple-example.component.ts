import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortDescriptionPipe } from './short-description-pipe';

@Component({
  selector: 'app-simple-example',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  template: `
    <div class="simple-demo">
      <h3>Ejemplo Simple del Pipe shortDescription</h3>
      
      <div class="demo-section">
        <h4>Texto original:</h4>
        <p class="original">{{ sampleText }}</p>
      </div>

      <div class="demo-section">
        <h4>Con pipe shortDescription:15</h4>
        <p class="truncated">{{ sampleText | shortDescription:15 }}</p>
      </div>

      <div class="demo-section">
        <h4>Con pipe shortDescription:25</h4>
        <p class="truncated">{{ sampleText | shortDescription:25 }}</p>
      </div>

      <div class="demo-section">
        <h4>Texto corto (sin truncamiento):</h4>
        <p class="truncated">{{ shortText | shortDescription:15 }}</p>
      </div>
    </div>
  `,
  styles: [`
    .simple-demo {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 2px solid #007bff;
      border-radius: 8px;
      background-color: #f8f9fa;
    }
    
    h3 {
      color: #007bff;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .demo-section {
      margin: 15px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
    }
    
    h4 {
      color: #495057;
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    
    .original {
      color: #6c757d;
      font-style: italic;
      background-color: #e9ecef;
      padding: 8px;
      border-radius: 4px;
    }
    
    .truncated {
      color: #212529;
      font-weight: bold;
      background-color: #d1ecf1;
      padding: 8px;
      border-radius: 4px;
      border-left: 4px solid #007bff;
    }
  `]
})
export class SimpleExampleComponent {
  sampleText = 'Este es un texto largo que debería cortarse cuando exceda el límite establecido';
  shortText = 'Texto corto';
}