import { Routes } from '@angular/router';
import { AuthTestComponent } from './components/auth-test.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'auth-test',
    component: AuthTestComponent,
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
