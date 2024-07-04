import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = '';
  photo: string = '';
  drawerOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.name = user.name;
        this.photo = user.photo;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
