import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType, CreateCategoryType } from '../types/category';

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
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createCategory(data: CreateCategoryType): Observable<CategoryType> {
    return this.http.post<CategoryType>(this.apiUrl, data);
  }

  updateCategory(
    id: string,
    data: CreateCategoryType
  ): Observable<CategoryType> {
    return this.http.put<CategoryType>(`${this.apiUrl}/${id}`, data);
  }
}
