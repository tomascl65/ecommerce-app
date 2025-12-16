import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { cartCanDeactivateGuard } from './guards/cart-can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    canActivate: [authGuard],
    canDeactivate: [cartCanDeactivateGuard],
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
