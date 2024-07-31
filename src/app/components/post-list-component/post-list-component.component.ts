import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { CardLoadingComponent } from "../../card-loading/card-loading.component";

@Component({
  selector: 'app-post-list-component',
  standalone: true,
  imports: [CommonModule, CardLoadingComponent],
  templateUrl: './post-list-component.component.html',
  styleUrl: './post-list-component.component.scss'
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Output() selecionarPost = new EventEmitter<number>();
  placeholderArray: any[] = new Array(6);
  loading: boolean = true;

  ngOnInit() {
    // Simula o carregamento de dados
    setTimeout(() => {
      this.posts =
        // Adicione mais posts conforme necessário
      ];
      this.loading = false; // Define como falso quando os dados são carregados
    }, 2000); // Simula 2 segundos de carregamento
  }

  onSelecionarPost(index: number): void {
    this.selecionarPost.emit(index);
  }
}
