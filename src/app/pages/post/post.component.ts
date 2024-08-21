import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post/post.service';
import { PostFormComponent } from '../../components/post-form-component/post-form-component.component';
import { PostListComponent } from '../../components/post-list-component/post-list-component.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    PostFormComponent,
    PostListComponent
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post = new Post();
  btnPublicar: boolean = true;
  tabela: boolean = true;
  loading: boolean = false;
  posts: Post[] = [];

  constructor(
    private service: PostService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.loading = true;
    this.service.selecionar().subscribe({
      next: retorno => {
        this.posts = retorno;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Erro ao obter posts. Por favor, tente novamente.');
      }
    });
  }

  publicar(): void {
    this.loading = true;
    this.service.publicar(this.post).subscribe({
      next: retorno => {
        this.posts.push(retorno);
        this.post = new Post();
        this.loading = false;
        this.toastService.success('Post Publicado com sucesso!');
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Erro ao publicar o post.');
      }
    });
  }

  selecionarPost(posicao: number): void {
    this.post = this.posts[posicao];
    this.btnPublicar = false;
    this.tabela = false;
  }

  editar(): void {
    this.loading = true;
    this.service.editar(this.post.id, this.post).subscribe({
      next: retorno => {
        let posicao = this.posts.findIndex(obj => obj.id === retorno.id);
        this.posts[posicao] = retorno;
        this.post = new Post();
        this.btnPublicar = true;
        this.tabela = true;
        this.loading = false;
        this.toastService.success('Post alterado com sucesso!');
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Erro ao alterar o post.');
      }
    });
  }

  remover(): void {
    this.loading = true;
    this.service.remover(this.post.id).subscribe({
      next: () => {
        let posicao = this.posts.findIndex(obj => obj.id === this.post.id);
        this.posts.splice(posicao, 1);
        this.post = new Post();
        this.btnPublicar = true;
        this.tabela = true;
        this.loading = false;
        this.toastService.success('Post removido com sucesso!');
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Erro ao remover o post.');
      }
    });
  }

  cancelar(): void {
    this.post = new Post();
    this.btnPublicar = true;
    this.tabela = true;
  }
}
