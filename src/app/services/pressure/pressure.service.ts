import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Pressure } from '../../models/Pressure';

@Injectable({
  providedIn: 'root',
})
export class PressureService {
  private url: string =
    'https://heartcare-backend.onrender.com/api/v1/pressure/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  token: string = this.authService.getToken();

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  selecionar(): Observable<Pressure[]> {
    return this.http.get<Pressure[]>(this.url, {
      headers: this.getAuthHeaders(),
    });
  }
}
