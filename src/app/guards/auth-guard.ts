import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Simulación: verificar si el usuario está autenticado
  const isAuthenticated =
    typeof window !== 'undefined' && window.localStorage?.getItem('token') !== null;

  if (!isAuthenticated) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
