import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pressure } from '../../models/Pressure';

@Component({
  selector: 'app-user-pressure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pressure.component.html',
  styleUrls: ['./user-pressure.component.scss'],
})
export class UserPressureComponent {
  @Input() pressures: Pressure[] = [];
  @Input() selectedUser: string = '';

  getUserPressures(userName: string): Pressure[] {
    return this.pressures.filter(
      (p) => `${p.userName} ${p.userLastName}` === userName
    );
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return dateObject.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
