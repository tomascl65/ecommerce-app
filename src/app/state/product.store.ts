import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

type ProductState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filter: string;
};

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, filter }) => ({
    filteredProducts: computed(() => {
      const term = filter().toLowerCase();
      return products().filter(
        p =>
          !term ||
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }),
  })),
  withMethods((store, productService = inject(ProductService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return productService.getProducts().pipe(
            tap({
              next: products => patchState(store, { products, isLoading: false, error: null }),
              error: (error: HttpErrorResponse) =>
                patchState(store, {
                  error: 'Error al cargar productos. Por favor intenta mas tarde.',
                  isLoading: false,
                }),
            })
          );
        })
      )
    ),
    updateFilter(filter: string) {
      patchState(store, { filter });
    },
  }))
);
