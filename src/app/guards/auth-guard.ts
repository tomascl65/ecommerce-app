import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    // Usar el servicio de autenticación de forma reactiva
    const isAuthenticated = await firstValueFrom(authService.isAuthenticated$);

    if (!isAuthenticated) {
      console.warn('[AUTH GUARD] Acceso denegado - usuario no autenticado', {
        path: state.url,
        timestamp: new Date().toISOString(),
      });
      router.navigate(['/login']);
      return false;
    }

    console.log('[AUTH GUARD] Acceso permitido', {
      path: state.url,
      timestamp: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('[AUTH GUARD] Error al verificar autenticación:', error);
    router.navigate(['/login']);
    return false;
  }
};
