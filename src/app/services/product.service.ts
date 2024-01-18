import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductType, ProductType } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://angular-database.vercel.app/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createProduct(data: CreateProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.apiUrl, data);
  }

  updateProduct(id: string, data: CreateProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${this.apiUrl}/${id}`, data);
  }
}
