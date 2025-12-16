import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';
import { Product, ProductWithDetails } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private _http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  getProductsWithDetails(): Observable<ProductWithDetails[]> {
    return this.getProducts().pipe(
      mergeMap(products =>
        from(products).pipe(
          mergeMap(product =>
            this.getProductById(product.id).pipe(
              map(detailedProduct => ({
                ...product,
                detailedDescription: detailedProduct.description,
              }))
            )
          ),
          toArray()
        )
      )
    );
  }
}
