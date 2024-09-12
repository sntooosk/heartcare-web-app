import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Pressure } from '../../models/Pressure';
import { httpGetAuth } from '../../utils/htppHeaders';

@Injectable({
  providedIn: 'root',
})
export class PressureService {
  private readonly url: string =
    'https://heartcare-backend.onrender.com/api/v1/pressure/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  selecionar(): Observable<Pressure[]> {
    return this.http.get<Pressure[]>(this.url, {
      headers: httpGetAuth(this.authService.getToken()),
    });
  }
}
