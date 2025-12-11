import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { cartStore } from '../state/cart.store';

@Component({
  selector: 'app-cart-test-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h3>🛍️ Prueba del Header con Carrito</h3>
      <p>
        Haz clic en los botones para agregar productos al carrito y observa cómo se actualiza el
        contador en el header:
      </p>

      <div class="button-group">
        <button (click)="addToCart(iphone)" class="btn btn-iphone">
          Agregar iPhone (\${{ iphone.price }})
        </button>

        <button (click)="addToCart(macbook)" class="btn btn-macbook">
          Agregar MacBook (\${{ macbook.price }})
        </button>

        <button (click)="addToCart(airpods)" class="btn btn-airpods">
          Agregar AirPods (\${{ airpods.price }})
        </button>

        <button (click)="clearCart()" class="btn btn-clear">Limpiar Carrito</button>
      </div>

      <div>
        <strong>Estado del carrito:</strong> {{ cartStore.totalItems() }} items
        <br />
        <strong>Total:</strong> \${{ cartStore.totalPrice() | number: '1.2-2' }}
      </div>
    </div>
  `,
  styles: [
    `
      .button-group {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        color: white;
        min-width: 150px;
      }

      .btn-iphone {
        background: #4caf50;
      }

      .btn-macbook {
        background: #2196f3;
      }

      .btn-airpods {
        background: #ff9800;
      }

      .btn-clear {
        background: #f44336;
      }
    `,
  ],
})
export class CartTestDemoComponent {
  protected readonly cartStore = cartStore;

  // Productos de ejemplo
  iphone: Product = {
    id: 1,
    title: 'iPhone 13 Pro Max',
    price: 1099.99,
    description: 'El iPhone 13 Pro Max más avanzado',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    rating: { rate: 4.8, count: 1247 },
  };

  macbook: Product = {
    id: 2,
    title: 'MacBook Air M2',
    price: 1199.99,
    description: 'MacBook Air con el revolucionario chip M2',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    rating: { rate: 4.9, count: 892 },
  };

  airpods: Product = {
    id: 3,
    title: 'AirPods Pro',
    price: 249.99,
    description: 'Auriculares inalámbricos con cancelación activa de ruido',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
    rating: { rate: 4.7, count: 2156 },
  };

  addToCart(product: Product): void {
    this.cartStore.addToCart(product, 1);
    console.log(`Agregado al carrito: ${product.title}`);
  }

  clearCart(): void {
    this.cartStore.clearCart();
    console.log('Carrito vaciado');
  }
}
