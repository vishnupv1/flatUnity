import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
@Component({
  selector: 'app-roommatereq',
  templateUrl: './roommatereq.component.html',
  styleUrls: ['./roommatereq.component.css']
})

export class RoommatereqComponent {
  submit: boolean = false
  constructor(private fb: FormBuilder, private UserService: UserServiceService, private router: Router, private toastr: ToastrService) {
  }
  roommateForm = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(5)]],
    gender: ['', [Validators.required]],
    rent: ['', [Validators.required]],
    image: '',
    contact: ['', [Validators.required]],
    amenities: this.fb.group({
      parking: false,
      ac: false,
      fridge: false,
      washing: false,
      inverter: false,
      wifi: false,
    }),
    description: ''

  })
  onSubmit() {
    if (!this.roommateForm.valid) {

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
      this.submit = true
      this.roomMatepost()
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
    const location = this.roommateForm.get('location')
    if (!location?.valid) {
      if (location?.hasError('required')) {
        return 'Location required'
      }
      else if (location?.hasError('minlength')) {
        return 'Minimum length of location should be fice'
      }
    }

    return
  }
  //error handling of email field in signup form
  rentError(): any {
    const rent = this.roommateForm.get('rent')
    if (!rent?.valid) {
      if (rent?.hasError('required')) {
        return 'rent required'
      }
    }
    return
  }
  genderError(): any {
    const gender = this.roommateForm.get('gender')
    if (!gender?.valid) {
      if (gender?.hasError('required')) {
        return 'Please select a gender'
      }
    }
    return
  }
  //error handling of email field in signup form
  mobileError(): any {
    const mobile = this.roommateForm.get('contact')
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
  roomMatepost() {
    this.UserService.roomMatepost(this.roommateForm.value).subscribe(
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


}

