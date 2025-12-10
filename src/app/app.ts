import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestPipeComponent } from './components/test-pipe.component';
import { SimpleExampleComponent } from './components/simple-example.component';
import { TestClickDirectiveComponent } from './components/test-click-directive.component';
import { SimpleClickExampleComponent } from './components/simple-click-example.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TestPipeComponent,
    SimpleExampleComponent,
    TestClickDirectiveComponent,
    SimpleClickExampleComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
