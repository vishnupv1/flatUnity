import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loggedIn?: boolean;
  password: string = '';
  hidePassword: boolean = true;
  submit: boolean = false
  userMobileNumber: any;


  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() { }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  otpForm = this.fb.group({
    mobile: ['', [Validators.required, this.mobileNumberValidator]],
  })

  mobileNumberValidator(control: any) {
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (control.value && !mobileNumberPattern.test(control.value)) {
      return { invalidMobileNumber: true };
    }
    return null;
  }
  mobileError(): any {
    const mobile = this.otpForm.get('mobile')
    if (!mobile?.valid) {
      if (mobile?.hasError('required')) {
        return 'Mobile Number required'
      }
      else if (this.mobileNumberValidator(mobile)) {
        return 'Mobile number is invalid'
      }
    }
    return
  }
  onSubmit() {
    if (!this.otpForm.valid) {
      if (this.mobileError()) {
        this.toastr.warning(this.mobileError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
    }
    else {
      const phone = this.otpForm.get('mobile')
      this.submit = true
      this.setUserMobileNumber(phone)
      this.otpSend()
      this.router.navigate(['optlogin'])
    }


  }
  otpSend() {
    this.userService.otpSend(this.otpForm.value as any).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.router.navigate(['otplogin'])
      }, (error) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
  setUserMobileNumber(mobile: any) {
    this.userService.setMobileNumber(mobile);
  }

}
