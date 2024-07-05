import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'https://heartcare-backend.onrender.com/api/v1/users/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private buildHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: this.getAuthHeaders()
    };
  }

  getUser(): Observable<User> {
    const userId = this.authService.getUserId();
    return this.http.get<User>(`${this.baseUrl}${userId}`, this.buildHttpOptions());
  }
}
