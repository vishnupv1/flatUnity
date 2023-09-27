import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/searcher/user-login/user-login.component';
import { UserRegisterComponent } from './components/searcher/user-register/user-register.component';

const routes: Routes =
  [{ component: UserLoginComponent, path: 'userlogin' },
  { component: UserRegisterComponent, path: 'register' },
  { path: 'admin', loadChildren: () => import('./admin-routing/admin.module').then((m) => m.AdminModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
