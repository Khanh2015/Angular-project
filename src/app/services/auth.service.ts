import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseType, LoginType } from '../types/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(data: LoginType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(`${this.apiUrl}/login`, data);
  }
}
