import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { formatTime, formatDate } from '../../utils/date-utils';
import { MatIcon} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-pressure',
  standalone: true,
  imports: [MatIcon , CommonModule],
  templateUrl: './user-pressure.component.html',
  styleUrls: ['./user-pressure.component.scss'],
})
export class UserPressureComponent {
  @Input() pressures: Pressure[] = [];
  @Input() selectedUser: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  getUserPressures(userName: string): Pressure[] {
    return this.pressures.filter(
      (p) => `${p.userName} ${p.userLastName}` === userName
    );
  }

  getFormattedDate(date: Date | string): string {
    return formatDate(date);
  }

  getFormattedTime(date: Date | string): string {
    return formatTime(date);
  }
}
