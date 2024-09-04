import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { CardLoadingComponent } from '../card-loading/card-loading.component';

@Component({
  selector: 'app-post-list-component',
  standalone: true,
  imports: [CommonModule, CardLoadingComponent],
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() loading: boolean = true;
  @Output() selecionarPost = new EventEmitter<number>();
  placeholderArray: any[] = new Array(6);

  onSelecionarPost(index: number): void {
    this.selecionarPost.emit(index);
  }

  formatarData(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
