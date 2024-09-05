import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post/post.service';
import { PostFormComponent } from '../../components/post-form-component/post-form-component.component';
import { PostListComponent } from '../../components/post-list-component/post-list-component.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostFormComponent, PostListComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  btnPublicar: boolean = true;
  tabela: boolean = true;
  loading: boolean = false;
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.selecionar().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: () => {
        this.toastr.error('Erro ao obter posts. Por favor, tente novamente.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  publish(): void {
    this.loading = true;
    this.postService.publicar(this.post).subscribe({
      next: (post) => {
        this.posts.push(post);
        this.resetPost();
        this.toastr.success('Post publicado com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao publicar o post.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  selectPost(post: Post): void {
    this.post = { ...post };
    this.btnPublicar = false;
    this.tabela = false;
  }

  edit(): void {
    this.loading = true;
    this.postService.editar(this.post.id, this.post).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex((p) => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.resetPost();
        this.toastr.success('Post alterado com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao alterar o post.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  remove(): void {
    this.loading = true;
    this.postService.remover(this.post.id).subscribe({
      next: () => {
        const index = this.posts.findIndex((p) => p.id === this.post.id);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
        this.resetPost();
        this.toastr.success('Post removido com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao remover o post.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  cancel(): void {
    this.resetPost();
  }

  private resetPost(): void {
    this.post = new Post();
    this.btnPublicar = true;
    this.tabela = true;
  }
}
