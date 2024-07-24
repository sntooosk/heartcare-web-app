import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatToolbar,
    MatList, 
    MatListItem,
    CommonModule
    ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() userNames: string[] = [];
  @Input() pressures: Pressure[] = [];
  @Output() selectUser = new EventEmitter<string>();

  getUserPhoto(userName: string): string | undefined {
    console.log(userName)
    const user = this.pressures.find(p => `${p.userName} ${p.userLastName}` === userName);
    return user?.userPhoto;
  }
}
