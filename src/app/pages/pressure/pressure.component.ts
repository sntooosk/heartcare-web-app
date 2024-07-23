import { Component, OnInit, ViewChild } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { PressureService } from '../../services/pressure/pressure.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-pressure',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss']
})
export class PressureComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  
  pressure = new Pressure();
  pressures: Pressure[] = [];
  userNames: string[] = [];
  selectedUser: string = '';

  constructor(
    private service: PressureService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => {
        this.pressures = retorno.sort((a, b) => a.id - b.id);
        this.extractUserNames();
      },
      error => {
        this.toastService.error('Erro ao obter pressure. Por favor, tente novamente.');
      });
  }

  extractUserNames(): void {
    const userNameSet = new Set<string>();
    this.pressures.forEach(p => {
      const fullName = `${p.userName} ${p.userLastName}`;
      userNameSet.add(fullName);
    });
    this.userNames = Array.from(userNameSet);
  }

  getUserPhoto(userName: string): string | undefined {
    const user = this.pressures.find(p => `${p.userName} ${p.userLastName}` === userName);
    return user?.userPhoto;
  }

  selectUser(userName: string) {
    this.selectedUser = userName;
    this.drawer.close();
  }

  convertDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('pt-BR', options);
  }

  getUserPressures(userName: string): Pressure[] {
    return this.pressures.filter(p => `${p.userName} ${p.userLastName}` === userName);
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
}
