import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pressure } from '../../models/Pressure';
import { PressureService } from '../../services/pressure/pressure.service';

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

  tabela: boolean = true;

  pressures: Pressure[] = [];

  constructor(
    private service: PressureService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.pressures = retorno,
      error => {
        this.toastService.error('Erro ao obter pressure. Por favor, tente novamente.');
      });
  }   
}