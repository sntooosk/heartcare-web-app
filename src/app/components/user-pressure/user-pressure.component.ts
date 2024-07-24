import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pressure } from '../../models/Pressure';

@Component({
  selector: 'app-user-pressure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pressure.component.html',
  styleUrl: './user-pressure.component.scss'
})
export class UserPressureComponent {
  @Input() pressures: Pressure[] = [];
  @Input() selectedUser: string = '';

  getUserPressures(userName: string): Pressure[] {
    return this.pressures.filter(p => `${p.userName} ${p.userLastName}` === userName);
  }
}
