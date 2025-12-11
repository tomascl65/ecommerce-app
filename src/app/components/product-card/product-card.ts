import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShortDescriptionPipe } from '../../pipes/short-description-pipe';
import { cartStore } from '../../state/cart.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  onAddToCart(): void {
    if (this.product) {
      cartStore.addToCart(this.product);
    }
  }
}
