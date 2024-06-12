import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URL: string = 'https://heartcare-backend.onrender.com/api/v1';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.URL}/auth/login`, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.URL}/auth/register`, { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
