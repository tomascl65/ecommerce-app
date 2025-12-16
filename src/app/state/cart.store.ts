import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private platformId = inject(PLATFORM_ID);

  // State
  private _items = signal<CartItem[]>([]);

  // Computed values
  count = computed(() =>
    this._items().reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
  );
  total = computed(() =>
    this._items().reduce(
      (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
      0
    )
  );

  // Public getters
  get items() {
    return this._items.asReadonly();
  }

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    if (isPlatformBrowser(this.platformId)) {
      // Obtiene desde localStorage
      const stored = localStorage?.getItem('cart_storage');
      if (stored) {
        try {
          this._items.set(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse cart storage', e);
        }
      }

      // Guarda a localStorage cuando hay cambio
      effect(() => {
        const items = this._items();
        localStorage?.setItem('cart_storage', JSON.stringify(items));
      });

      const handleStorage = (event: StorageEvent) => {
        if (event.key === 'cart_storage' && event.newValue) {
          try {
            this._items.set(JSON.parse(event.newValue));
          } catch (e) {
            console.error('Failed to parse cart sync', e);
          }
        }
      };
      window.addEventListener('storage', handleStorage);
    }
  }

  addToCart(product: Product) {
    const currentItems = this._items();
    const existingItem = currentItems.find((item: CartItem) => item.product.id === product.id);

    if (existingItem) {
      this._items.update(items =>
        items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this._items.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    this._items.update(items => items.filter((item: CartItem) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this._items.update(items =>
      items.map((item: CartItem) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  clearCart() {
    this._items.set([]);
  }

  setItems(items: CartItem[]) {
    this._items.set(items);
  }
}
