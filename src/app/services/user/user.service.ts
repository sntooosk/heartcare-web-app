import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/User';
import { httpGetAuth } from '../../utils/htppHeaders';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = 'https://heartcare-backend.onrender.com/api/v1/users/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<User> {
    const userId = this.authService.getUserId();
    const headers = httpGetAuth(this.authService.getToken());

    return this.http.get<User>(`${this.url}${userId}`, { headers });
  }
}
