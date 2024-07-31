import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pressure } from '../../models/Pressure';

@Component({
  selector: 'app-user-pressure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pressure.component.html',
  styleUrls: ['./user-pressure.component.scss']
})
export class UserPressureComponent {
  @Input() pressures: Pressure[] = [];
  @Input() selectedUser: string = '';

  private datePipe = new DatePipe('en-US');

  getUserPressures(userName: string): Pressure[] {
    return this.pressures.filter(p => `${p.userName} ${p.userLastName}` === userName);
  }

  formatDateTime(date: Date | string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }
}
