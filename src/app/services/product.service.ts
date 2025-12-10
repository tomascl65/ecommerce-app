import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, from, map, toArray } from 'rxjs';
import { Product, ProductWithDetails } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  getProductsWithDetails(): Observable<ProductWithDetails[]> {
    return this.getProducts().pipe(
      mergeMap((products) =>
        from(products).pipe(
          mergeMap((product) =>
            this.getProductById(product.id).pipe(
              map((detailedProduct) => ({
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
