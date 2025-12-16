import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsoleLogDirective } from '../../directives/console-log.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConsoleLogDirective],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simular login exitoso
      const { email } = this.loginForm.value;

      // Guardar token (esto trigger el logging en AuthService)
      this.authService.setToken('simulated_token_123');

      // Log adicional con la directiva
      console.log('[LOGIN] Login form submitted', {
        email,
        timestamp: new Date().toISOString(),
      });

      // Redirigir
      window.setTimeout(() => {
        this.router.navigate(['/products']);
        this.isSubmitting = false;
      }, 1000);
    } else {
      // Marcar los campos como tocados para mostrar errores
      this.markFormGroupTouched();
    }
  }

  // Método para logout
  onLogout(): void {
    // Log del logout con la directiva
    console.log('[LOGIN] Logout requested', {
      timestamp: new Date().toISOString(),
    });

    // Llamar al servicio de auth (esto trigger el logging en AuthService)
    this.authService.logout();

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'El email es requerido';
    }
    if (this.email?.hasError('email')) {
      return 'El formato del email no es válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (this.password?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
