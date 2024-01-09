import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://fakestoreapi.com/products';

  // http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.apiUrl);
  }
}
