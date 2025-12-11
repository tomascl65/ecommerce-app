import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDemoComponent } from './components/cart-demo.component';
import { SimpleClickExampleComponent } from './components/simple-click-example.component';
import { SimpleExampleComponent } from './components/simple-example.component';
import { TestClickDirectiveComponent } from './components/test-click-directive.component';
import { TestPipeComponent } from './components/test-pipe.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TestPipeComponent,
    SimpleExampleComponent,
    TestClickDirectiveComponent,
    SimpleClickExampleComponent,
    CartDemoComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-app');

  ngOnInit(): void {
    // Ejemplo de inicialización del componente
    console.log('App inicializada:', this.title());
  }
}
