import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConsoleLogDirective } from '../../directives/console-log.directive';
import { AuthService } from '../../services/auth.service';
import { CartStore } from '../../state/cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ConsoleLogDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly cartStore = inject(CartStore);
  readonly authService = inject(AuthService);

  toggleAuth() {
    if (this.authService.isAuthenticated()) {
      console.log('[HEADER] Logout initiated from header', {
        timestamp: new Date().toISOString(),
      });
      this.authService.logout();
    } else {
      console.log('[HEADER] Login initiated from header', {
        timestamp: new Date().toISOString(),
      });
      // Simular login
      this.authService.setToken('simulated-token');
    }
  }
}
