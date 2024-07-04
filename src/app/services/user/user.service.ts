import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  selecionar(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, { headers: this.getAuthHeaders() });
  }

  editar(idUser: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${idUser}`, user, { headers: this.getAuthHeaders() });
  }

  remover(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${idUser}`, { headers: this.getAuthHeaders() });
  }
}
