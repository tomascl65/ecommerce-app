import { inject } from '@angular/core';
import { CanDeactivateFn, UrlTree } from '@angular/router';
import { CartStore } from '../state/cart.store';

export interface CanComponentDeactivate {
  canDeactivate?: () => boolean | UrlTree | Promise<boolean | UrlTree>;
}

export const cartCanDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = async (
  component: CanComponentDeactivate,
  currentRoute,
  currentState,
  nextState
) => {
  // Verificar que estamos en un entorno de navegador
  if (typeof window === 'undefined') {
    return true;
  }

  const cartStore = inject(CartStore);

  // Si el componente tiene su propio método canDeactivate, usarlo
  if (component.canDeactivate) {
    const result = await component.canDeactivate();
    if (result !== true) {
      return result;
    }
  }

  // Verificar si hay elementos en el carrito que podrían perderse
  const cartItems = cartStore.items();
  const hasUnsavedChanges = cartItems.length > 0;

  if (hasUnsavedChanges) {
    const confirmMessage =
      '¿Estás seguro de que quieres salir del carrito? Tienes elementos sin procesar que podrían perderse.';
    const shouldLeave = window.confirm(confirmMessage);

    if (!shouldLeave) {
      console.warn('[CART GUARD] Navegación cancelada - usuario decidió permanecer en el carrito', {
        itemCount: cartItems.length,
        timestamp: new Date().toISOString(),
      });
      return false;
    }

    console.log('[CART GUARD] Usuario confirmó salir del carrito', {
      itemCount: cartItems.length,
      nextRoute: nextState?.url,
      timestamp: new Date().toISOString(),
    });
  }

  return true;
};
