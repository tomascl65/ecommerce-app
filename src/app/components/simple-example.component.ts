import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortDescriptionPipe } from '../pipes/short-description-pipe';

@Component({
  selector: 'app-simple-example',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  template: `
    <div>
      <h3>Ejemplo Simple del Pipe shortDescription</h3>
      
      <div>
        <h4>Texto original:</h4>
        <p class="original">{{ sampleText }}</p>
      </div>

      <div>
        <h4>Con pipe shortDescription:15</h4>
        <p>{{ sampleText | shortDescription:15 }}</p>
      </div>

      <div>
        <h4>Con pipe shortDescription:25</h4>
        <p>{{ sampleText | shortDescription:25 }}</p>
      </div>

      <div>
        <h4>Texto corto (sin truncamiento):</h4>
        <p>{{ shortText | shortDescription:15 }}</p>
      </div>
    </div>
  `,
  styles: [`
    .original {
      color: #6c757d;
      font-style: italic;
      background-color: #e9ecef;
      padding: 8px;
      border-radius: 4px;
    }
  `]
})
export class SimpleExampleComponent {
  sampleText = 'Este es un texto largo que debería cortarse cuando exceda el límite establecido';
  shortText = 'Texto corto';
}