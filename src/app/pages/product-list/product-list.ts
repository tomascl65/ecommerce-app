import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './product-list.html',
  // Removed styleUrl, using Tailwind
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  searchForm: FormGroup;

  // State
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Derived state for filtering
  searchTerm = signal<string>('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const products = this.products();
    if (!term) return products;
    return products.filter(
      p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.searchForm = this.fb.group({
      searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Error al cargar productos. Por favor intenta mas tarde.');
        this.loading.set(false);
      },
    });

    // Subscribe to search form changes to update signal
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(val => {
      // Only filter if valid or empty (reset)
      if (this.searchForm.valid || val === '') {
        this.searchTerm.set(val || '');
      }
    });
  }

  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.searchTerm.set(this.searchForm.get('searchTerm')?.value);
    }
  }
}
