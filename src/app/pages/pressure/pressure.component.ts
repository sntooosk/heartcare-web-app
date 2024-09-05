import { Component, NgModule, OnInit } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { PressureService } from '../../services/pressure/pressure.service';
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserPressureComponent } from '../../components/user-pressure/user-pressure.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pressure',
  standalone: true,
  imports: [UserListComponent, UserPressureComponent, CommonModule],
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss'],
})
export class PressureComponent implements OnInit {
  pressure: Pressure = new Pressure();
  pressures: Pressure[] = [];
  userNames: string[] = [];
  selectedUser: string = '';
  loading: boolean = false;
  isSidebarVisible: boolean = true;

  constructor(
    private pressureService: PressureService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPressures();
  }

  loadPressures(): void {
    this.loading = true;
    this.pressureService.selecionar().subscribe({
      next: (pressures) => {
        this.pressures = pressures.sort((a, b) => a.id - b.id);
        this.extractUserNames();
      },
      error: () => {
        this.toastr.error('Erro ao obter pressão. Por favor, tente novamente.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  extractUserNames(): void {
    const userNameSet = new Set<string>();
    this.pressures.forEach((p) => {
      const fullName = `${p.userName} ${p.userLastName}`;
      userNameSet.add(fullName);
    });
    this.userNames = Array.from(userNameSet);
  }

  selectUser(userName: string): void {
    this.selectedUser = userName;
    this.toggleSidebar();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
