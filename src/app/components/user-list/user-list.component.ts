import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatToolbar,
    MatList,
    MatListItem,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() userNames: string[] = [];
  @Input() pressures: Pressure[] = [];
  @Input() loading: boolean = false;
  @Output() selectUser = new EventEmitter<string>();

  getUserPhoto(userName: string): string | undefined {
    const user = this.pressures.find(p => `${p.userName} ${p.userLastName}` === userName);
    return user?.userPhoto;
  }
}
