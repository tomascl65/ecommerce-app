import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShortDescriptionPipe } from '../../pipes/short-description-pipe';
import { CartStore } from '../../state/cart.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  templateUrl: './product-card.html',
  // Removed styleUrl since we use Tailwind
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cartStore = inject(CartStore);

  onAddToCart(): void {
    if (this.product) {
      this.cartStore.addToCart(this.product);
    }
  }
}
