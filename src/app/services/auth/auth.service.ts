import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/dto/auth/auth-response-dto';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private URL: string = 'https://heartcare-backend.onrender.com/api/v1';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser() {
    const userId = this.getUserId();
    const userToken = this.getToken();

    return this.httpClient.get<User>(`${this.URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).pipe(
      tap((user: User) => {
        sessionStorage.setItem('user-id', user.id.toString());
        sessionStorage.setItem('user-name', user.name);
        sessionStorage.setItem('user-lastname', user.lastname);
        sessionStorage.setItem('user-dob', user.dob);
        sessionStorage.setItem('user-gender', user.gender);
        sessionStorage.setItem('user-photo', user.photo);
      })
    );
  }


  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(`${this.URL}/auth/login`, { email, password })
      .pipe(
        tap((authResponse: AuthResponse) => {
          sessionStorage.setItem('user-token', authResponse.token);
          sessionStorage.setItem('user-id', authResponse.id.toString());
          sessionStorage.setItem('user-name', authResponse.name);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('user-token');
    sessionStorage.removeItem('user-id');
    sessionStorage.removeItem('user-name');
  }


  getUsername(): string {
    return sessionStorage.getItem('user-name') || '';
  }

  getPhoto(): string {
    return sessionStorage.getItem('user-photo') || '';
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
      !!sessionStorage.getItem('user-id') &&
      !!sessionStorage.getItem('user-name')
    );
  }

}
