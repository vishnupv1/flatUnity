import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/searcher/user-login/user-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './material.components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserRegisterComponent } from './components/searcher/user-register/user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { OtploginComponent } from './components/searcher/otplogin/otplogin.component';
import { UserhomeComponent } from './components/searcher/userhome/userhome.component';
import { UserheaderComponent } from './components/searcher/userheader/userheader.component';
import { FlatpostComponent } from './components/searcher/flatpost/flatpost.component';
import { FlatmatepostComponent } from './components/searcher/flatmatepost/flatmatepost.component';
import { UsermanagementComponent } from './components/admin/usermanagement/usermanagement.component';
import { FlatfeedsComponent } from './components/admin/flatfeeds/flatfeeds.component';
import { FlatMatefeedsComponent } from './components/admin/flat-matefeeds/flat-matefeeds.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './store/effect';
import { profileReducer, roompostReducer, userReducer } from './store/reducer';
import { postsReducer } from './store/reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor';
import { RequirementComponent } from './components/searcher/requirement/requirement.component';
import { RoomreqComponent } from './components/searcher/roomreq/roomreq.component';
import { RoommatereqComponent } from './components/searcher/roommatereq/roommatereq.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerifyUserComponent } from './components/searcher/verify-user/verify-user.component';
import { ActivitylogComponent } from './components/searcher/activitylog/activitylog.component';
import { ProfileComponent } from './components/searcher/profile/profile.component';
import { DeleteConfirmationComponent } from './components/searcher/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagePostComponent } from './components/searcher/manage-post/manage-post.component';
import { ActivitylogRoomComponent } from './components/searcher/activitylog-room/activitylog-room.component';
import { FlatRentReqComponent } from './components/searcher/flat-rent-req/flat-rent-req.component';
import { PremiumComponent } from './components/searcher/premium/premium.component';
import { EditPostComponent } from './components/searcher/edit-post/edit-post.component';
import { UserFooterComponent } from './components/searcher/user-footer/user-footer.component';
import { DatePipe } from '@angular/common';
import { DetailedViewComponent } from './components/searcher/detailed-view/detailed-view.component';
import { EditPostRoommateComponent } from './components/searcher/edit-post-roommate/edit-post-roommate.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { CarouselModule } from 'ngx-bootstrap/carousel';




@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminHomeComponent,
    UserRegisterComponent,
    OtploginComponent,
    UserhomeComponent,
    UserheaderComponent,
    FlatpostComponent,
    FlatmatepostComponent,
    UsermanagementComponent,
    FlatfeedsComponent,
    FlatMatefeedsComponent,
    PlansComponent,
    RequirementComponent,
    RoomreqComponent,
    RoommatereqComponent,
    VerifyUserComponent,
    ActivitylogComponent,
    ProfileComponent,
    DeleteConfirmationComponent,
    ManagePostComponent,
    ActivitylogRoomComponent,
    FlatRentReqComponent,
    PremiumComponent,
    EditPostComponent,
    UserFooterComponent,
    DetailedViewComponent,
    EditPostRoommateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: userReducer,
      posts: postsReducer,
      roomposts: roompostReducer,
      profile: profileReducer
    }),
    EffectsModule.forRoot([userEffects]),
    NgxDropzoneModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
