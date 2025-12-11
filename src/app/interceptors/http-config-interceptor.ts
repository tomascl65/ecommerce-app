import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Notification } from '../services/notification';

export const httpConfigInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(Notification);

  // Clonar la request para agregar headers
  const authReq = req.clone({
    setHeaders: {
      'Custom-Header': 'MyCustomHeaderValue',
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejo centralizado de errores
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
      }
      // Mostrar notificación al usuario
      notificationService.showError(errorMessage);
      // Relanzar el error para que lo maneje el componente si es necesario
      return throwError(() => new Error(errorMessage));
    })
  );
};
