import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/Post';
import { AuthService } from '../auth/auth.service';
import { httpGetAuth } from '../../utils/htppHeaders';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly url: string =
    'https://heartcare-backend.onrender.com/api/v1/posts/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  selecionar(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, {
      headers: httpGetAuth(this.authService.getToken()),
    });
  }

  publicar(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post, {
      headers: httpGetAuth(this.authService.getToken()),
    });
  }

  editar(idPost: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}${idPost}`, post, {
      headers: httpGetAuth(this.authService.getToken()),
    });
  }

  remover(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${codigo}`, {
      headers: httpGetAuth(this.authService.getToken()),
    });
  }
}
