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
import { RequirementComponent } from './components/searcher/requirement/requirement.component';
import { RoomreqComponent } from './components/searcher/roomreq/roomreq.component';
import { RoommatereqComponent } from './components/searcher/roommatereq/roommatereq.component';
import { VerifyUserComponent } from './components/searcher/verify-user/verify-user.component';
import { ActivitylogComponent } from './components/searcher/activitylog/activitylog.component';
import { ProfileComponent } from './components/searcher/profile/profile.component';
import { ManagePostComponent } from './components/searcher/manage-post/manage-post.component';
import { ActivitylogRoomComponent } from './components/searcher/activitylog-room/activitylog-room.component';
import { FlatRentReqComponent } from './components/searcher/flat-rent-req/flat-rent-req.component';
import { PremiumComponent } from './components/searcher/premium/premium.component';

const routes: Routes =
  [
    { component: UserLoginComponent, path: '', canActivate: [authGuard] },
    { component: UserRegisterComponent, path: 'register' },
    { component: OtploginComponent, path: 'otplogin' },
    { component: RequirementComponent, path: 'requirement' },
    { component: FlatpostComponent, path: 'flatpost' },
    { component: RoomreqComponent, path: 'roomflat' },
    { component: VerifyUserComponent, path: 'verify' },
    { component: RoommatereqComponent, path: 'roommate' },
    { component: RoomreqComponent, path: 'roomreq' },
    { component: FlatRentReqComponent, path: 'flatrent' },
    { component: ManagePostComponent, path: 'activity' },
    { component: PremiumComponent, path: 'premium' },
    { component: ActivitylogComponent, path: 'flatmatepostMod' },
    { component: ActivitylogRoomComponent, path: 'flatpostMod' },
    { component: ProfileComponent, path: 'profile' },
    { component: FlatmatepostComponent, path: 'flatmatepost', canActivate: [userhomeAuthGuard] },
    {
      component: UserhomeComponent, path: 'home',
    },
    { path: 'admin', loadChildren: () => import('./admin-routing/admin.module').then((m) => m.AdminModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
