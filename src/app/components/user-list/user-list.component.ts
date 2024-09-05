import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { CardLoadingComponent } from '../card-loading/card-loading.component';
import { UserLoadingComponent } from '../user-loading/user-loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatToolbar,
    MatList,
    MatListItem,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    CardLoadingComponent,
    UserLoadingComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() userNames: string[] = [];
  @Input() pressures: Pressure[] = [];
  @Input() loading: boolean = false;
  @Output() selectUser = new EventEmitter<string>();

  skeletonLoading: any[] = new Array(4);

  filterText: string = '';

  get filteredUserNames(): string[] {
    if (!this.filterText) {
      return this.userNames;
    }
    return this.userNames.filter(user =>
      user.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  getUserPhoto(userName: string): string | undefined {
    const user = this.pressures.find(
      (p) => `${p.userName} ${p.userLastName}` === userName
    );
    return user?.userPhoto;
  }

}
