import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/searcher/user-login/user-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { } from '@angular/material/input'
import { MatInputModule } from '@angular/material/input'
// import { MaterialModule } from './material.components';
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
    PlansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    // MatFormFieldModule, 
    // MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
