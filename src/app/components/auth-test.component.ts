import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h3>Prueba de Autenticación del Guard</h3>

      <div>
        <p>
          <strong>Estado actual:</strong>
          <span>
            {{ isAuthenticated ? '✅ Autenticado' : '❌ No autenticado' }}
          </span>
        </p>

        <p>
          <strong>Token:</strong>
          <code>{{ token || 'No hay token' }}</code>
        </p>
      </div>

      <div>
        <h4>Acciones:</h4>

        <button (click)="login()" class="btn btn-primary">
          🔑 Simular Login (establecer token)
        </button>

        <button (click)="logout()" class="btn btn-secondary">🚪 Logout (eliminar token)</button>

        <button (click)="goToCart()" class="btn btn-cart" [disabled]="!isAuthenticated">
          🛒 Ir al Carrito (protegido)
        </button>

        <button (click)="goToHome()" class="btn btn-home">🏠 Ir al Inicio</button>
      </div>

      <div>
        <p><strong>URL actual:</strong> {{ currentUrl }}</p>
        <p><em>Abre la consola del navegador para ver los logs de navegación</em></p>
      </div>
    </div>
  `,
  styles: [
    `
      .btn {
        margin: 5px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }

      .btn-primary {
        background-color: #007bff;
        color: white;
      }

      .btn-secondary {
        background-color: #6c757d;
        color: white;
      }

      .btn-cart {
        background-color: #28a745;
        color: white;
      }

      .btn-cart:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
        opacity: 0.6;
      }

      .btn-home {
        background-color: #17a2b8;
        color: white;
      }
    `,
  ],
})
export class AuthTestComponent implements OnInit {
  isAuthenticated = false;
  token: string | null = null;
  currentUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateAuthStatus();
    this.currentUrl = window.location.pathname;

    // Suscribirse a cambios de autenticación
    this.authService.isAuthenticated$.subscribe(authenticated => {
      console.log('🔄 Estado de autenticación cambiado:', authenticated);
      this.updateAuthStatus();
    });

    // Log de navegación
    this.router.events.subscribe(() => {
      this.currentUrl = window.location.pathname;
      console.log('📍 Navegación detectada. URL actual:', this.currentUrl);
      console.log('🔐 Estado de autenticación actual:', this.isAuthenticated);
    });
  }

  updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.token = this.authService.getToken();
    console.log('🔍 Estado actualizado - Autenticado:', this.isAuthenticated, 'Token:', this.token);
  }

  login() {
    const testToken = `demo-token-${Date.now()}`;
    this.authService.setToken(testToken);
    console.log('🔑 Login simulado con token:', testToken);
  }

  logout() {
    this.authService.logout();
    console.log('🚪 Logout ejecutado');
  }

  goToCart() {
    console.log('🛒 Navegando al carrito...');
    this.router.navigate(['/cart']);
  }

  goToHome() {
    console.log('🏠 Navegando al inicio...');
    this.router.navigate(['/']);
  }
}
