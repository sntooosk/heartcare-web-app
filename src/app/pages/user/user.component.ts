import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class userComponent implements OnInit {

  user = new User();

  btnCadastro: boolean = true;
  tabela: boolean = true;

  users: User[] = [];

  constructor(
    private service: UserService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.users = retorno,
        error => {
          this.toastService.error('Erro ao obter users. Por favor, tente novamente.');
        });
  }

  cadastrar(): void {
    this.service.cadastrar(this.user)
      .subscribe(retorno => {
        this.users.push(retorno);
        this.user = new User();
        this.toastService.success('user cadastrado com sucesso!');
      },
        error => {
          this.toastService.error('Erro ao cadastrar o user.');
        });
  }

  selecionarUser(posicao: number): void {
    this.user = this.users[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar(): void {
    this.service.editar(this.user.id, this.user)
      .subscribe(retorno => {
        let posicao = this.users.findIndex(obj => obj.id === retorno.id);
        this.users[posicao] = retorno;
        this.user = new User();
        this.btnCadastro = true;
        this.tabela = true;
        this.toastService.success('user alterado com sucesso!');
      },
        error => {
          this.toastService.error('Erro ao alterar o user.');
        });
  }

  remover(): void {
    this.service.remover(this.user.id)
      .subscribe(retorno => {
        let posicao = this.users.findIndex(obj => obj.id === this.user.id);
        this.users.splice(posicao, 1);
        this.user = new User();
        this.btnCadastro = true;
        this.tabela = true;
        this.toastService.success('user removido com sucesso!');
      },
        error => {
          this.toastService.error('Erro ao remover o user.');
        });
  }

  cancelar(): void {
    this.user = new User();
    this.btnCadastro = true;
    this.tabela = true;
  }
}
