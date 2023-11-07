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
  file: any
  formData: any
  constructor(private fb: FormBuilder, private UserService: UserServiceService, private router: Router, private toastr: ToastrService) {
  }
  roommateForm = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(5)]],
    gender: ['', [Validators.required]],
    rent: ['', [Validators.required]],
    image: '',
    contact: ['', [Validators.required]],
    parking: false,
    ac: false,
    fridge: false,
    washing: false,
    inverter: false,
    wifi: false,
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
      if (this.imageError()) {
        this.toastr.warning(this.imageError(), '', {
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
      this.formData = new FormData();
      this.formData.append('location', this.roommateForm.get('location')!.value!);
      this.formData.append('gender', this.roommateForm.get('gender')!.value!);
      this.formData.append('rent', this.roommateForm.get('rent')!.value!);
      // this.formData.append('image', this.selectedImages);
      this.formData.append('contact', this.roommateForm.get('contact')!.value!);
      this.formData.append('ac', this.roommateForm.get('ac')!.value!.toString());
      this.formData.append('parking', this.roommateForm.get('parking')!.value!.toString());
      this.formData.append('wifi', this.roommateForm.get('wifi')!.value!.toString());
      this.formData.append('fridge', this.roommateForm.get('fridge')!.value!.toString());
      this.formData.append('washing', this.roommateForm.get('washing')!.value!.toString());
      this.formData.append('inverter', this.roommateForm.get('inverter')!.value!.toString());
      this.formData.append('description', this.roommateForm.get('description')!.value!);
      for (let i = 0; i < this.selectedImages.length; i++) {
        this.formData.append('image', this.selectedImages[i].file);
      }
      this.roomMatepost()
      this.router.navigate(['roommate'])
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
        return 'Minimum length of location should be five'
      }
    }

    return
  }
  imageError(): any {
    const image = this.roommateForm.get('image')
    if (this.selectedImages.length == 0) {
      return 'Select atleast one image of your flat/room'
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
    this.UserService.roomMatepost(this.formData).subscribe(
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
  selectedImages: any[] = [];
  validateFileType(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg'];
    return allowedTypes.includes(file.type);
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.validateFileType(file)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push({
            file: file,
            url: e.target.result
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.toastr.warning('Only JPEG/PNG file allowed', '', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
      }
    }
  }

  // const files: FileList = event.target.files;
  // if (files.length > 0) {
  //   this.file = files[0]; 
  // }

  onDeleteImage(index: number) {
    this.selectedImages.splice(index, 1);
  }
}

