import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { formatDate } from '../../utils/date-utils';

@Component({
  selector: 'app-post-list-component',
  standalone: true,
  imports: [CommonModule, CardLoadingComponent],
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss'],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() loading: boolean = true;
  @Output() selecionarPost = new EventEmitter<Post>();
  skeletonLoading: any[] = new Array(6);

  get sortedPosts(): Post[] {
    return this.posts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getFormattedDate(date: Date | string): string {
    return formatDate(date);
  }
}
