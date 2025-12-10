import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestPipeComponent } from './components/test-pipe.component';
import { SimpleExampleComponent } from './components/simple-example.component';
import { TestClickDirectiveComponent } from './components/test-click-directive.component';
import { SimpleClickExampleComponent } from './components/simple-click-example.component';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

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
export class App implements OnInit {
  protected readonly title = signal('ecommerce-app');
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('Productos:', products);
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }
}
