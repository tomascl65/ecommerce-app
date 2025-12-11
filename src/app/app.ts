import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestPipeComponent } from './components/test-pipe.component';
import { SimpleExampleComponent } from './components/simple-example.component';
import { TestClickDirectiveComponent } from './components/test-click-directive.component';
import { SimpleClickExampleComponent } from './components/simple-click-example.component';
import { CartDemoComponent } from './components/cart-demo.component';
import { ProductService } from './services/product.service';
import { Product, ProductWithDetails } from './models/product.model';

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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Usar el nuevo método con llamadas anidadas
    this.productService.getProductsWithDetails().subscribe({
      next: (products: ProductWithDetails[]) => {
        console.log('Productos con detalles:', products);
        console.log('Primer producto con detailedDescription:', products[0]);
      },
      error: (error) => {
        console.error('Error al obtener productos con detalles:', error);
      },
    });
  }
}
