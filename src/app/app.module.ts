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
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import {
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserRegisterComponent } from './components/searcher/user-register/user-register.component';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminHomeComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    // MatFormFieldModule, 
    // MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SocialLoginModule,
    GoogleSigninButtonModule
    // MatFormFieldModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1054362202802-vgqtj7lqv6t09amee57nkj40quvnoqvo.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },GoogleSigninButtonDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
