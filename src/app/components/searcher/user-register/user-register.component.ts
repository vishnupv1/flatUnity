import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  submit: boolean = false
  // inCorrect: boolean = false
  // emailUsed!: string;

  user: User = {} as User;

  constructor(private fb: FormBuilder, private UserService: UserServiceService, private router: Router, private toastr: ToastrService) {
  }
  //form decleration and validation criterias
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email, Validators.required]],
    mobile: ['', [Validators.required, this.mobileNumberValidator]],
    gender: ['male', [Validators.required]],
    userType: ['searcher', [Validators.required]],
    city: ['Kochi', [Validators.required]],
  })
  //mobile number custom validation
  mobileNumberValidator(control: any) {
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (control.value && !mobileNumberPattern.test(control.value)) {
      return { invalidMobileNumber: true };
    }
    return null;
  }
  //submit signup form with validations
  onSubmit() {
    if (!this.registerForm.valid) {

      if (this.nameError()) {
        this.toastr.warning(this.nameError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.emailError()) {
        this.toastr.warning(this.emailError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
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
      this.submit = true
      this.registerUser()
    }


  }
  //registering user - initiating POST
  registerUser() {
    this.UserService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        // this.router.navigate([''])
      }, (error) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Error', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
  //error handling of name field in signup form
  nameError(): any {
    const name = this.registerForm.get('name')
    if (!name?.valid) {
      if (name?.hasError('required')) {
        return 'Name required'
      }
      else if (name?.hasError('minlength')) {
        return 'Minimum length of name should be two'
      }
    }

    return
  }
  //error handling of email field in signup form
  emailError(): any {
    const email = this.registerForm.get('email')
    if (!email?.valid) {
      if (email?.hasError('required')) {
        return 'Email id required'
      }
      else if (email?.hasError('email')) {
        return 'Invalid email Id'
      }
    }
    return
  }
  //error handling of email field in signup form
  mobileError(): any {
    const mobile = this.registerForm.get('mobile')
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
}
