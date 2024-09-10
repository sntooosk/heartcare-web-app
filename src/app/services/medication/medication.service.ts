import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Medication } from '../../models/Medication';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  private url: string =
    'https://heartcare-backend.onrender.com/api/v1/medication/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  token: string = this.authService.getToken();

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  selecionar(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.url, {
      headers: this.getAuthHeaders(),
    });
  }
}
