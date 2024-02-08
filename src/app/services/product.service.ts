import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductType, ProductType } from '../types/product';
import { getAccessToken } from '../ultilities';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // apiUrl = 'https://angular-database.vercel.app/products';
  apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.apiUrl);
  }

  getProductsPaginate(page: number, limit: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('_page', page.toString());
    params = params.append('_limit', limit.toString());

    return this.http.get<any>(
      'https://angular-database.vercel.app/products/paginate',
      {
        params: params,
      }
    );
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.apiUrl}/${id}`);
  }

  searchProducts(keyword: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `https://angular-database.vercel.app/products/search?query=${keyword}`
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  createProduct(data: CreateProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.apiUrl, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  updateProduct(id: string, data: CreateProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${this.apiUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
}
