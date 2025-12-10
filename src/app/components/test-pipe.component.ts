import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortDescriptionPipe } from '../pipes/short-description-pipe';

@Component({
  selector: 'app-test-pipe',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  styleUrl: './components.scss',
  template: `
    <div>
      <h2>Prueba del Pipe shortDescription</h2>
      
      <div class="test-case">
        <h3>Texto largo (más de 20 caracteres):</h3>
        <p><strong>Texto original:</strong> {{ longText }}</p>
        <p><strong>Texto cortado (20 chars):</strong> {{ longText | shortDescription:20 }}</p>
        <p><strong>Texto cortado (15 chars):</strong> {{ longText | shortDescription:15 }}</p>
      </div>

      <div class="test-case">
        <h3>Texto corto (menos de 15 caracteres):</h3>
        <p><strong>Texto original:</strong> {{ shortText }}</p>
        <p><strong>Texto con pipe (15 chars):</strong> {{ shortText | shortDescription:15 }}</p>
      </div>

      <div class="test-case">
        <h3>Texto exacto (15 caracteres):</h3>
        <p><strong>Texto original:</strong> {{ exactText }}</p>
        <p><strong>Texto con pipe (15 chars):</strong> {{ exactText | shortDescription:15 }}</p>
      </div>
    </div>
  `
})
export class TestPipeComponent {
  longText = 'Esta es una descripción larga que debe cortarse cuando exceda el límite establecido';
  shortText = 'Texto corto';
  exactText = 'LasQuinceLetras';
}