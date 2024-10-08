import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuAnimation', [
      state(
        'collapsed',
        style({
          height: '0',
          opacity: '0',
          visibility: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1',
          visibility: 'visible',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ]),
    trigger('menuIconAnimation', [
      state(
        'collapsed',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)',
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
