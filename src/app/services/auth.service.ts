import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Establece token
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.TOKEN_KEY, token);
      this.updateAuthStatus();
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
      window.localStorage.removeItem(this.TOKEN_KEY);
      this.updateAuthStatus();
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
}
