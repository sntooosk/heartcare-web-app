import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { userComponent } from './pages/user/user.component';
import { PostComponent } from './pages/post/post.component';

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
        path: 'users',
        component: userComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
];
