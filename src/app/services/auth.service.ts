import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Interface para tipado específico de datos de logging de autenticación
interface AuthLogData {
  hasToken?: boolean;
  token?: string;
  timestamp: string;
  [key: string]: string | boolean | number | object | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.logAuthEvent('AuthService initialized', {
      hasToken: this.hasToken(),
      timestamp: new Date().toISOString(),
    });
  }

  // Establece token (login)
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.TOKEN_KEY, token);
      this.updateAuthStatus();
      this.logAuthEvent('User login successful', {
        token: `${token.substring(0, 10)}...`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Obtiene token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Verifica si está autenticado
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  // Elimina token (logout)
  logout(): void {
    if (typeof window !== 'undefined') {
      const hadToken = this.hasToken();
      window.localStorage.removeItem(this.TOKEN_KEY);
      this.updateAuthStatus();

      if (hadToken) {
        this.logAuthEvent('User logout successful', {
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  // Verifica si existe token
  private hasToken(): boolean {
    return typeof window !== 'undefined' && window.localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  // Actualiza estado de autenticación
  private updateAuthStatus(): void {
    this.isAuthenticatedSubject.next(this.hasToken());
  }

  // Método para logging de eventos de autenticación
  private logAuthEvent(event: string, data?: AuthLogData): void {
    console.log(`[AUTH] ${event}`, {
      ...data,
      service: 'AuthService',
    });
  }
}
