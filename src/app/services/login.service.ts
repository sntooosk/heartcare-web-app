import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import LoginResponseDTO from '../models/dto/LoginResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URL: string = 'https://heartcare-backend.onrender.com/api/v1/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponseDTO>(`${this.URL}/login`, { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
          this.router.navigate(['/user']); // Redireciona para a página principal após o login
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponseDTO>(`${this.URL}/register`, { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
          this.router.navigate(['/user']); // Redireciona para a página principal após o cadastro
        })
      );
  }
}
