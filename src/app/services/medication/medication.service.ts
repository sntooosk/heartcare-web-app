import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Medication } from '../../models/Medication';
import { httpGetAuth } from '../../utils/htppHeaders';

@Injectable({ providedIn: 'root' })
export class MedicationService {
  private readonly url = 'https://heartcare-backend.onrender.com/api/v1/medication/';

  constructor(private http: HttpClient, private authService: AuthService) {}

 
  selecionar(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.url, { headers: httpGetAuth(this.authService.getToken()) });
  }
}
