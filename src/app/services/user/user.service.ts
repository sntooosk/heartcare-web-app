import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  selecionar(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.buildHttpOptions());
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.buildHttpOptions());
  }

  editar(idUser: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${idUser}`, user, this.buildHttpOptions());
  }

  remover(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${idUser}`, this.buildHttpOptions());
  }

  getUser(): Observable<User> {
    const userId = this.authService.getUserId();
    return this.http.get<User>(`${this.baseUrl}${userId}`, this.buildHttpOptions());
  }
}
