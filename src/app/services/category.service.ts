import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType } from '../types/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'https://angular-database.vercel.app/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(this.apiUrl);
  }
}
