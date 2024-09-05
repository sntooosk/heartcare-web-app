import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { PressureComponent } from './pages/pressure/pressure.component';

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'posts',
        component: PostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pressures',
        component: PressureComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
