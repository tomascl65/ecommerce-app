import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, PLATFORM_ID } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const CART_STORAGE_KEY = 'cart_storage';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(store => ({
    count: computed(() => store.items().reduce((acc, item) => acc + item.quantity, 0)),
    total: computed(() =>
      store.items().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    ),
  })),
  withMethods(store => ({
    addToCart(product: Product) {
      const currentItems = store.items();
      const existingItem = currentItems.find(item => item.product.id === product.id);

      if (existingItem) {
        patchState(store, {
          items: currentItems.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      } else {
        patchState(store, { items: [...currentItems, { product, quantity: 1 }] });
      }
    },
    removeFromCart(productId: number) {
      patchState(store, {
        items: store.items().filter(item => item.product.id !== productId),
      });
    },
    updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      patchState(store, {
        items: store
          .items()
          .map(item => (item.product.id === productId ? { ...item, quantity } : item)),
      });
    },
    clearCart() {
      patchState(store, { items: [] });
    },
    setItems(items: CartItem[]) {
      patchState(store, { items });
    },
  })),
  withHooks({
    onInit(store) {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          try {
            patchState(store, { items: JSON.parse(stored) });
          } catch (e) {
            console.error('Failed to parse cart storage', e);
          }
        }

        effect(() => {
          const items = store.items();
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        });

        const handleStorage = (event: StorageEvent) => {
          if (event.key === CART_STORAGE_KEY && event.newValue) {
            try {
              patchState(store, { items: JSON.parse(event.newValue) });
            } catch (e) {
              console.error('Failed to parse cart sync', e);
            }
          }
        };
        window.addEventListener('storage', handleStorage);
      }
    },
  })
);
