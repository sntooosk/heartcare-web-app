import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/dto/auth/auth-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private URL: string = 'https://heartcare-backend.onrender.com/api/v1';

  constructor(
    private httpClient: HttpClient
  ) { }

 
  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(`${this.URL}/auth/login`, { email, password })
      .pipe(
        tap((authResponse: AuthResponse) => {
          sessionStorage.setItem('user-token', authResponse.token);
          sessionStorage.setItem('user-id', authResponse.id.toString());
        })
      );
  }

  logout() {
    sessionStorage.removeItem('user-token');
    sessionStorage.removeItem('user-id');
  }

  getUserId(): number {
    const userId = sessionStorage.getItem('user-id');
    return userId ? parseInt(userId, 10) : 0;
  }

  getToken(): string {
    return sessionStorage.getItem('user-token') || '';
  }

  isLoggedIn(): boolean {
    return (
      !!sessionStorage.getItem('user-token') &&
      !!sessionStorage.getItem('user-id')
    );
  }

}
