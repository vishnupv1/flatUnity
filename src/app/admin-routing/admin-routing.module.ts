import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../components/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from '../components/admin/admin-home/admin-home.component';
import { UsermanagementComponent } from '../components/admin/usermanagement/usermanagement.component';
import { adminAuthGuard } from '../Auth/admin-auth.guard';
import { adminloginAuthGuard } from '../Auth/adminlogin-auth.guard';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent, canActivate: [adminAuthGuard] },
  { path: 'adminhome', component: AdminHomeComponent, canActivate: [adminloginAuthGuard] },
  { path: 'users', component: AdminHomeComponent },
  { path: 'flatfeed', component: AdminHomeComponent },
  { path: 'flatMatefeed', component: AdminHomeComponent },
  { path: 'plans', component: AdminHomeComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

