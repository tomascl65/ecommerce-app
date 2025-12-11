import { signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class CartStore {
  // lista de productos en el carrito
  cartItems = signal<CartItem[]>([]);

  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.update(() => [...currentItems]);
    } else {
      this.cartItems.update((items) => [...items, { product, quantity }]);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}

export const cartStore = new CartStore();
