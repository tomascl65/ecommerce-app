import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { ShortDescriptionPipe } from '../pipes/short-description-pipe';
import { CartStore } from '../state/cart.store';

@Component({
  selector: 'app-cart-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ShortDescriptionPipe],
  template: `
    <div>
      <h2>Demostración del CartStore</h2>

      <!-- Info del carrito -->
      <div>
        <div>
          <h3>Estado del Carrito</h3>
          <p><strong>Total de Items:</strong> {{ cartStore.count() }}</p>
          <p><strong>Precio Total:</strong> {{ cartStore.total() | currency }}</p>
        </div>
      </div>

      <!-- Productos disponibles -->
      <div>
        <h3>Productos Disponibles</h3>
        <div class="products-grid">
          <div *ngFor="let product of sampleProducts">
            <h4>{{ product.title }}</h4>
            <p>{{ product.price | currency }}</p>
            <p>{{ product.description | shortDescription: 40 }}</p>

            <div>
              <input
                type="number"
                [(ngModel)]="quantities[product.id]"
                min="1"
                value="1"
                class="quantity-input"
              />
              <button (click)="addToCart(product)" class="add-btn">Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Items del carrito -->
      <div *ngIf="cartStore.count() > 0">
        <h3>Items en el Carrito:</h3>
        <div class="products-grid">
          <div *ngFor="let item of cartStore.items()">
            <div>
              <h4>{{ item.product.title }}</h4>
              <p>Precio unitario: {{ item.product.price | currency }}</p>
              <p>Subtotal: {{ item.product.price * item.quantity | currency }}</p>

              <div>
                <label>Cantidad:</label>
                <input
                  type="number"
                  [value]="item.quantity"
                  min="1"
                  (change)="updateQuantity(item.product.id, $any($event.target).value)"
                  class="quantity-input"
                />

                <button (click)="removeFromCart(item.product.id)" class="remove-btn">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button (click)="clearCart()" class="clear-btn">Vaciar Carrito</button>
        </div>
      </div>

      <div *ngIf="cartStore.count() === 0">
        <p>El carrito está vacío.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .quantity-input {
        width: 60px;
        padding: 5px;
        border: 1px solid #ced4da;
        border-radius: 4px;
      }

      .add-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        flex: 1;
      }

      .remove-btn {
        background: #dc3545;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
      }

      .clear-btn {
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class CartDemoComponent {
  cartStore = inject(CartStore);

  // Productos
  sampleProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 13 Pro',
      price: 999.99,
      description: 'El iPhone 13 Pro con chip A15 Bionic y pantalla Super Retina XDR',
      category: 'smartphones',
      image: '',
      rating: { rate: 4.8, count: 150 },
    },
    {
      id: 2,
      title: 'MacBook Air M2',
      price: 1199.99,
      description: 'MacBook Air con chip M2, 8GB de RAM y 256GB SSD',
      category: 'laptops',
      image: '',
      rating: { rate: 4.9, count: 89 },
    },
    {
      id: 3,
      title: 'AirPods Pro',
      price: 249.99,
      description: 'Auriculares inalámbricos con cancelación de ruido y audio espacial',
      category: 'audio',
      image: '',
      rating: { rate: 4.7, count: 234 },
    },
  ];

  // Cantidades por producto
  quantities: { [key: number]: number } = {};

  constructor() {
    // Efecto para observar cambios en el carrito
    effect(() => {
      const totalItems = this.cartStore.count();
      const totalPrice = this.cartStore.total();
      console.log(`Carrito actualizado - Items: ${totalItems}, Total: $${totalPrice.toFixed(2)}`);
    });

    // Inicializar cantidades
    this.sampleProducts.forEach(product => {
      this.quantities[product.id] = 1;
    });
  }

  addToCart(product: Product): void {
    const quantity = this.quantities[product.id] || 1;
    // Add the product the specified number of times
    for (let i = 0; i < quantity; i++) {
      this.cartStore.addToCart(product);
    }
    console.log(`Agregado al carrito: ${product.title} (cantidad: ${quantity})`);
  }

  removeFromCart(productId: number): void {
    this.cartStore.removeFromCart(productId);
    console.log(`Eliminado del carrito: producto ID ${productId}`);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const quantity = parseInt(String(newQuantity), 10);
    if (quantity > 0) {
      this.cartStore.updateQuantity(productId, quantity);
      console.log(`Cantidad actualizada para producto ID ${productId}: ${quantity}`);
    }
  }

  clearCart(): void {
    this.cartStore.clearCart();
    console.log('Carrito vaciado');
  }
}
