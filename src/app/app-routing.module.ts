import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/searcher/user-login/user-login.component';
import { UserRegisterComponent } from './components/searcher/user-register/user-register.component';
import { OtploginComponent } from './components/searcher/otplogin/otplogin.component';
import { UserhomeComponent } from './components/searcher/userhome/userhome.component';
import { authGuard } from './Auth/user-auth.guard';
import { userhomeAuthGuard } from './Auth/userhome-auth.guard';
import { FlatpostComponent } from './components/searcher/flatpost/flatpost.component';
import { FlatmatepostComponent } from './components/searcher/flatmatepost/flatmatepost.component';

const routes: Routes =
  [
    { component: UserLoginComponent, path: '', canActivate: [authGuard] },
    { component: UserRegisterComponent, path: 'register' },
    { component: OtploginComponent, path: 'otplogin' },
    { component: FlatpostComponent, path: 'flatpost' },
    { component: FlatmatepostComponent, path: 'flatmatepost' },
    {
      component: UserhomeComponent, path: 'home', canActivate: [userhomeAuthGuard],
    },
    { path: 'admin', loadChildren: () => import('./admin-routing/admin.module').then((m) => m.AdminModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
