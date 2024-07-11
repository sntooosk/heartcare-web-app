import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/dto/auth/auth-response-dto';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private URL: string = 'https://heartcare-backend.onrender.com/api/v1';

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastrService,

  ) { }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(`${this.URL}/auth/login`, { email, password })
      .pipe(
        tap((authResponse: AuthResponse) => {
          if (authResponse.role === 'USER') {
            this.toastService.error('Usuário não autorizado.');
          } else if (authResponse.role === 'ADMIN') {
            sessionStorage.setItem('user-token', authResponse.token);
            sessionStorage.setItem('user-id', authResponse.id.toString());
          } else {
            this.toastService.error(authResponse.message);
          }
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
