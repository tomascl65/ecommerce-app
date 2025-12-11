import { Component } from '@angular/core';
import { cartStore } from '../../state/cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  // Inyectar cartStore usando inyección de dependencias
  protected readonly cartStore = cartStore;
}
