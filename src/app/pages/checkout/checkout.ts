import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartStore } from '../../state/cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cartStore = inject(CartStore);

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(5)]],
  });

  loading = false;
  success = false;
  error: string | null = null;

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.loading = true;
      this.error = null;

      // Simulate API call
      setTimeout(() => {
        // Random success/failure for demonstration (mostly success)
        if (Math.random() > 0.1) {
          this.success = true;
          this.cartStore.clearCart();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          this.error = 'Error al procesar el pago. Inténtalo de nuevo.';
        }
        this.loading = false;
      }, 2000);
    }
  }
}
