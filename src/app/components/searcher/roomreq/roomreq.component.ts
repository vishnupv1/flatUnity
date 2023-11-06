import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roomreq',
  templateUrl: './roomreq.component.html',
  styleUrls: ['./roomreq.component.css']
})
export class RoomreqComponent {
  submit: boolean = false
  file: any
  formData: any
  constructor(private fb: FormBuilder, private UserService: UserServiceService, private router: Router, private toastr: ToastrService) {
  }
  roomForm = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(5)]],
    gender: ['', [Validators.required]],
    rent: ['', [Validators.required]],
    contact: ['', [Validators.required]],
    date: ['', [Validators.required]],
    description: ''
  })
  onSubmit() {
    if (!this.roomForm.valid) {
      if (this.locationError()) {
        this.toastr.warning(this.locationError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.genderError()) {
        this.toastr.warning(this.genderError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.rentError()) {
        this.toastr.warning(this.rentError(), '', {
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
      this.roomPost()
    }


  }
  mobileNumberValidator(control: any) {
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (control.value && !mobileNumberPattern.test(control.value)) {
      return { invalidMobileNumber: true };
    }
    return null;
  }
  //error handling of name field in signup form
  locationError(): any {
    const location = this.roomForm.get('location')
    if (!location?.valid) {
      if (location?.hasError('required')) {
        return 'Location required'
      }
      else if (location?.hasError('minlength')) {
        return 'Minimum length of location should be five'
      }
    }

    return
  }
  //error handling of email field in signup form
  rentError(): any {
    const rent = this.roomForm.get('rent')
    if (!rent?.valid) {
      if (rent?.hasError('required')) {
        return 'rent required'
      }
    }
    return
  }
  genderError(): any {
    const gender = this.roomForm.get('gender')
    if (!gender?.valid) {
      if (gender?.hasError('required')) {
        return 'Please select a gender'
      }
    }
    return
  }
  //error handling of email field in signup form
  mobileError(): any {
    const mobile = this.roomForm.get('contact')
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
  roomPost() {
    this.UserService.roomPost(this.roomForm.value).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.router.navigate(['roomreq'])
      }, (error) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Error', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
}
