import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType, CreateCategoryType } from '../types/category';
import { getAccessToken } from '../ultilities';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:8000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(this.apiUrl);
  }

  getCategory(id: string): Observable<CategoryType> {
    return this.http.get<CategoryType>(`${this.apiUrl}/${id}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  createCategory(data: CreateCategoryType): Observable<CategoryType> {
    return this.http.post<CategoryType>(this.apiUrl, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  updateCategory(
    id: string,
    data: CreateCategoryType
  ): Observable<CategoryType> {
    return this.http.put<CategoryType>(`${this.apiUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
}
