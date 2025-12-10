import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestPipeComponent } from './test-pipe.component';
import { SimpleExampleComponent } from './simple-example.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestPipeComponent, SimpleExampleComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
