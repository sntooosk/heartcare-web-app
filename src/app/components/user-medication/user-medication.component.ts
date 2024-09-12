import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medication } from '../../models/Medication';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-medication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-medication.component.html',
  styleUrl: './user-medication.component.scss'
})
export class UserMedicationComponent {

  @Input() medication: Medication[] = [];
  @Input() selectedUser: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();


  getUserMedications(): Medication[] {
    return this.medication.filter(
      m => `${m.userName} ${m.userLastName}` === this.selectedUser
    );
  }

}
