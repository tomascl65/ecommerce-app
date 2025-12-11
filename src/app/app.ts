import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDemoComponent } from './components/cart-demo.component';
import { ProductCardDemoComponent } from './components/product-card-demo.component';
import { SimpleClickExampleComponent } from './components/simple-click-example.component';
import { SimpleExampleComponent } from './components/simple-example.component';
import { TestClickDirectiveComponent } from './components/test-click-directive.component';
import { TestPipeComponent } from './components/test-pipe.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TestPipeComponent,
    SimpleExampleComponent,
    TestClickDirectiveComponent,
    SimpleClickExampleComponent,
    CartDemoComponent,
    ProductCardDemoComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-app');

  // Productos de muestra para demostrar el ProductCard
  sampleProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max',
      price: 1099.99,
      description:
        'El iPhone 13 Pro Max más avanzado con chip A15 Bionic, sistema de cámara Pro y pantalla Super Retina XDR de 6.7 pulgadas.',
      category: 'smartphones',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      rating: { rate: 4.8, count: 1247 },
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 1199.99,
      description:
        'MacBook Air con el revolucionario chip M2, 8GB de memoria unificada y SSD de 256GB.',
      category: 'laptops',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      rating: { rate: 4.9, count: 892 },
    },
    {
      id: 3,
      title: 'AirPods Pro',
      price: 249.99,
      description:
        'Auriculares inalámbricos con cancelación activa de ruido, audio espacial personalizado y estuche MagSafe.',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
      rating: { rate: 4.7, count: 2156 },
    },
  ];

  ngOnInit(): void {
    // Ejemplo de inicialización del componente
    console.log('App inicializada:', this.title());
  }
}
