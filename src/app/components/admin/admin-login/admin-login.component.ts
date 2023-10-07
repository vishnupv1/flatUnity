import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  password: string = ''; // Initialize the password field
  hidePassword: boolean = true; // Initially hide the password
  submit: boolean = false
  adminToken: string = ''


  constructor(private fb: FormBuilder,
    private router: Router, private toastr: ToastrService,
    private adminservice: AdminServiceService) { }

  ngOnInit() { }
  togglePasswordVisibility(): void {
    // Toggle the value of hidePassword when the button is clicked
    this.hidePassword = !this.hidePassword;
  }

  adminForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  usernameError(): any {
    const name = this.adminForm.get('username')
    if (!name?.valid) {
      if (name?.hasError('required')) {
        return 'Username required'
      }
      else if (name?.hasError('minlength')) {
        return 'Minimum length of username is two'
      }
    }

    return
  }
  passwordError(): any {
    const password = this.adminForm.get('password')
    if (!password?.valid) {
      if (password?.hasError('required')) {
        return 'Password required'
      }
      else if (password?.hasError('minlength')) {
        return 'Minimum length of password is six'
      }
      else if (password?.hasError('pattern')) {
        return `Pattern does'nt match`
      }
    }

    return
  }


  onSubmit() {
    if (!this.adminForm.valid) {
      if (this.usernameError()) {
        this.toastr.warning(this.usernameError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.passwordError()) {
        this.toastr.warning(this.passwordError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
      }
    }
    else {
      this.submit = true
      this.adminLogin()
    }


  }
  adminLogin() {
    this.adminservice.adminLogin(this.adminForm.value as any).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.adminToken = response.adminToken
        localStorage.setItem('adminToken', this.adminToken);
        this.router.navigate(['/admin/adminhome'])
      }, (error) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })

  }
}
