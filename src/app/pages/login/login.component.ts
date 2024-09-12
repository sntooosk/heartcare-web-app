import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get disablePrimaryBtn(): boolean {
    return this.loginForm.invalid;
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm.valueChanges.subscribe(() => {});
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const { email, password } = this.loginForm.value;

    if (typeof email === 'string' && typeof password === 'string') {
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/home']),
        error: () =>
          this.toastr.error(
            'Falha ao realizar login. Verifique suas credenciais.'
          ),
      });
    } else {
      this.toastr.error('Falha ao realizar login. Verifique suas credenciais.');
    }
  }
}
