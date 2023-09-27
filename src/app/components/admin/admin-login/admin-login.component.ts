import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  password: string = ''; // Initialize the password field
  hidePassword: boolean = true; // Initially hide the password

  togglePasswordVisibility(): void {
    // Toggle the value of hidePassword when the button is clicked
    this.hidePassword = !this.hidePassword;
  }

}
