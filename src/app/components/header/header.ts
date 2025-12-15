import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartStore } from '../../state/cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly cartStore = inject(CartStore);
  readonly authService = inject(AuthService);

  toggleAuth() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    } else {
      // Simular login
      this.authService.setToken('simulated-token');
    }
  }
}
