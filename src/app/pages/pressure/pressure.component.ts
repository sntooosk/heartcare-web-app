import { Component, OnInit } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { PressureService } from '../../services/pressure/pressure.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pressure',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss']
})
export class PressureComponent implements OnInit {

  pressure = new Pressure();
  pressures: Pressure[] = [];
  userFilter: string = '';

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
      },
      error => {
        this.toastService.error('Erro ao obter pressure. Por favor, tente novamente.');
      });
  }

  filteredPressures(): Pressure[] {
    if (!this.userFilter.trim()) {
      return this.pressures;
    }
    return this.pressures.filter(p =>
      p.userName.toLowerCase().includes(this.userFilter.toLowerCase()) ||
      p.userLastName.toLowerCase().includes(this.userFilter.toLowerCase())
    );
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
}
