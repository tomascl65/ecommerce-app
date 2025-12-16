import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductStore } from '../../state/product.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  readonly store = inject(ProductStore);
  private fb = inject(FormBuilder);

  searchForm: FormGroup;

  loading = this.store.isLoading;
  error = this.store.error;
  filteredProducts = this.store.filteredProducts;

  constructor() {
    this.searchForm = this.fb.group({
      searchTerm: new FormControl('', [Validators.minLength(3)]),
    });
  }

  ngOnInit() {
    this.store.loadProducts();

    // Suscribirse a cambios del formulario de búsqueda para actualizar store
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(val => {
      // Solo filtrar si es válido o vacío (resetear)
      if (this.searchForm.valid || val === '') {
        this.store.updateFilter(val || '');
      }
    });
  }

  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.store.updateFilter(this.searchForm.get('searchTerm')?.value);
    }
  }
}
