import { Component, OnInit } from '@angular/core';
import { Pressure } from '../../models/Pressure';
import { PressureService } from '../../services/pressure/pressure.service';
import { ToastrService } from 'ngx-toastr';
import { UserListComponent } from "../../components/user-list/user-list.component";
import { UserPressureComponent } from "../../components/user-pressure/user-pressure.component";

@Component({
  selector: 'app-pressure',
  standalone: true,
  imports: [
    UserListComponent,
    UserPressureComponent
  ],
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss']
})
export class PressureComponent implements OnInit {

  pressure = new Pressure();
  pressures: Pressure[] = [];
  userNames: string[] = [];
  selectedUser: string = '';
  loading: boolean = false;

  constructor(
    private service: PressureService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.loading = true;
    this.service.selecionar()
      .subscribe(retorno => {
        this.pressures = retorno.sort((a, b) => a.id - b.id);
        this.extractUserNames();
        this.loading = false;
      },
      error => {
        this.toastService.error('Erro ao obter pressão. Por favor, tente novamente.');
        this.loading = false; // Desativa o carregamento em caso de erro
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

  selectUser(userName: string) {
    this.selectedUser = userName;
  }

}
