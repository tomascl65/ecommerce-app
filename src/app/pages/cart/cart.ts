import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../state/cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
})
export class Cart {
  cartStore = inject(CartStore);

  // 10% tax
  tax = computed(() => this.cartStore.total() * 0.1);
  grandTotal = computed(() => this.cartStore.total() + this.tax());

  increment(productId: number, quantity: number) {
    this.cartStore.updateQuantity(productId, quantity + 1);
  }

  decrement(productId: number, quantity: number) {
    if (quantity > 1) {
      this.cartStore.updateQuantity(productId, quantity - 1);
    } else {
      this.cartStore.removeFromCart(productId);
    }
  }

  remove(productId: number) {
    this.cartStore.removeFromCart(productId);
  }
}
