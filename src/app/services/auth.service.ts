import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponseType,
  LoginType,
  SignUpResponseType,
  SignUpType,
} from '../types/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:8000/auth/';
  // apiUrl = 'https://angular-database.vercel.app/auth';
  constructor(private http: HttpClient) {}

  login(data: LoginType): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(`${this.apiUrl}/login`, data);
  }

  signUp(data: SignUpType): Observable<SignUpResponseType> {
    return this.http.post<SignUpResponseType>(`${this.apiUrl}/signup`, data);
  }
}
