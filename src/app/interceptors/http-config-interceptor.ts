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
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
      }
      notificationService.showError(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
