import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/Post';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = 'https://heartcare-backend.onrender.com/api/v1/posts/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  selecionar(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, { headers: this.getAuthHeaders() });
  }

  publicar(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post, {
      headers: this.getAuthHeaders(),
    });
  }

  editar(idPost: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}${idPost}`, post, {
      headers: this.getAuthHeaders(),
    });
  }

  remover(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${codigo}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
