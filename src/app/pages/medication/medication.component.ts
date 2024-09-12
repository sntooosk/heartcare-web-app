import { Component, OnInit } from '@angular/core';
import { Medication } from '../../models/Medication';
import { MedicationService } from '../../services/medication/medication.service';
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { UserMedicationComponent } from '../../components/user-medication/user-medication.component';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [UserListComponent, CommonModule, UserMedicationComponent],
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent implements OnInit {
  medication: Medication = new Medication();
  medications: Medication[] = [];
  userNames: string[] = [];
  selectedUser = '';
  loading = false;
  isSidebarVisible = true;

  constructor(
    private medicationService: MedicationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMedications();
  }

  private loadMedications(): void {
    this.loading = true;
    this.medicationService.selecionar().subscribe({
      next: (medications) => {
        this.medications = medications.sort((a, b) => a.id - b.id);
        this.userNames = this.extractUserNames();
      },
      error: () =>
        this.toastr.error(
          'Erro ao obter medicamentos. Por favor, tente novamente.'
        ),
      complete: () => (this.loading = false),
    });
  }

  private extractUserNames(): string[] {
    const userNameSet = new Set<string>();
    this.medications.forEach(({ userName, userLastName }) =>
      userNameSet.add(`${userName} ${userLastName}`)
    );
    return Array.from(userNameSet);
  }

  selectUser(userName: string): void {
    this.selectedUser = userName;
    this.toggleSidebar();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
