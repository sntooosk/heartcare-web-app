import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list-component.component.html',
  styleUrl: './post-list-component.component.scss'
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Output() selecionarPost = new EventEmitter<number>();

  onSelecionarPost(index: number): void {
    this.selecionarPost.emit(index);
  }
}
