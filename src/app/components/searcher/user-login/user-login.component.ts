import { Component,OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: any;
  loggedIn: any;
  password: string = ''; 
  hidePassword: boolean = true; 
  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
      
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
