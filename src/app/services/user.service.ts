import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../types/user';
import { getAccessToken } from '../ultilities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://angular-database.vercel.app/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.apiUrl);
  }

  getUser(id: string): Observable<UserType> {
    return this.http.get<UserType>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  updateUser(id: string, data: { email: string }): Observable<UserType> {
    return this.http.put<UserType>(`${this.apiUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
}
