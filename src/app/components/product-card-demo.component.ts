import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { CartStore } from '../state/cart.store';
import { ProductCardComponent } from './product-card/product-card';

@Component({
  selector: 'app-product-card-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-card-demo.html',
  styleUrl: './product-card-demo.scss',
})
export class ProductCardDemoComponent {
  cartStore = inject(CartStore);

  // Productos de muestra
  sampleProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max',
      price: 1099.99,
      description:
        'El iPhone 13 Pro Max más avanzado con chip A15 Bionic, sistema de cámara Pro y pantalla Super Retina XDR de 6.7 pulgadas. Perfecto para profesionales y entusiastas de la tecnología.',
      category: 'smartphones',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      rating: { rate: 4.8, count: 1247 },
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 1199.99,
      description:
        'MacBook Air con el revolucionario chip M2, 8GB de memoria unificada y SSD de 256GB. Ultraligero, silencioso y con una autonomía increíble para trabajar todo el día.',
      category: 'laptops',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      rating: { rate: 4.9, count: 892 },
    },
    {
      id: 3,
      title: 'AirPods Pro (2da generación)',
      price: 249.99,
      description:
        'Auriculares inalámbricos con cancelación activa de ruido, audio espacial personalizado y estuche MagSafe. Experiencia de audio inmersiva para música, llamadas y entretenimiento.',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
      rating: { rate: 4.7, count: 2156 },
    },
    {
      id: 4,
      title: 'iPad Pro 12.9"',
      price: 1099.99,
      description:
        'iPad Pro de 12.9 pulgadas con chip M2, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil. La herramienta perfecta para creatividad y productividad.',
      category: 'tablets',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
      rating: { rate: 4.8, count: 743 },
    },
    {
      id: 5,
      title: 'Apple Watch Series 9',
      price: 399.99,
      description:
        'Apple Watch Series 9 con chip S9, pantalla más brillante y nuevas funciones de salud. Tu compañero inteligente para fitness, salud y conectividad.',
      category: 'wearables',
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop',
      rating: { rate: 4.6, count: 1567 },
    },
    {
      id: 6,
      title: 'Sony WH-1000XM5',
      price: 349.99,
      description:
        'Auriculares inalámbricos con cancelación de ruido líder en la industria, calidad de sonido excepcional y batería de 30 horas. Perfectos para viajes y trabajo.',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: { rate: 4.7, count: 1834 },
    },
  ];

  constructor() {
    // Efecto para observar cambios en el carrito
    effect(() => {
      const totalItems = this.cartStore.count();
      const totalPrice = this.cartStore.total();
      console.log(`Carrito actualizado - Items: ${totalItems}, Total: $${totalPrice.toFixed(2)}`);
    });
  }

  removeFromCart(productId: number): void {
    this.cartStore.removeFromCart(productId);
    console.log(`Eliminado del carrito: producto ID ${productId}`);
  }

  clearCart(): void {
    this.cartStore.clearCart();
    console.log('Carrito vaciado');
  }
}
