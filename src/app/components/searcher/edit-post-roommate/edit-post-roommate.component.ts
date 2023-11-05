import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { DatePipe } from '@angular/common';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-edit-post-roommate',
  templateUrl: './edit-post-roommate.component.html',
  styleUrls: ['./edit-post-roommate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EditPostRoommateComponent {
  roommatepost$!: Observable<any[]>
  postData: any = {}
  roommateform!: FormGroup
  file: any
  formData: any
  submit: boolean = false
  formattedDate: any
  postId: string = ''

  constructor(private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>,
    private fb: FormBuilder,
    private UserService: UserServiceService,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.store.dispatch(fetchRoommateReq())
      this.roommatepost$ = this.store.pipe(select(postSelectorData))
      this.roommatepost$ = this.roommatepost$.pipe(
        map((posts) => posts.filter((post) => post._id == this.postId))
      );
    });

    interface InitialData { }

    this.roommatepost$.subscribe(data => {
      if (data && data.length > 0) {
        const initialData: InitialData = data[0];
        this.postData = { ...initialData };
      }
      const submit: boolean = false
      const imageBaseUrl = 'http://localhost:3000/public/userImages/'

      for (let i = 0; i < this.postData.images.length; i++) {
        const fileName = this.postData.images[i];
        const imageUrl = `${imageBaseUrl}/${fileName}`;
        this.selectedImages.push({
          file: fileName, // Store the file name for reference.
          url: imageUrl,  // Construct the image URL.
        });
      }

      this.roommateform = this.fb.group({
        location: [this.postData.location, [Validators.required, Validators.minLength(5)]],
        gender: [this.postData.gender, [Validators.required]],
        rent: [this.postData.rent, [Validators.required]],
        image: '',
        contact: [this.postData.mobile, [Validators.required]],
        parking: this.postData.amenities.includes('Parking'),
        ac: this.postData.amenities.includes('A/C'),
        fridge: this.postData.amenities.includes('Fridge'),
        washing: this.postData.amenities.includes('Washing Mechine'),
        inverter: this.postData.amenities.includes('Inverter'),
        wifi: this.postData.amenities.includes('Wi-Fi'),
        description: this.postData.description
      })
    });
  }

  onSubmit() {
    if (!this.roommateform.valid) {
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
      this.formData.append('location', this.roommateform.get('location')!.value!);
      this.formData.append('gender', this.roommateform.get('gender')!.value!);
      this.formData.append('rent', this.roommateform.get('rent')!.value!);
      this.formData.append('contact', this.roommateform.get('contact')!.value!);
      this.formData.append('ac', this.roommateform.get('ac')!.value!.toString());
      this.formData.append('parking', this.roommateform.get('parking')!.value!.toString());
      this.formData.append('wifi', this.roommateform.get('wifi')!.value!.toString());
      this.formData.append('fridge', this.roommateform.get('fridge')!.value!.toString());
      this.formData.append('washing', this.roommateform.get('washing')!.value!.toString());
      this.formData.append('inverter', this.roommateform.get('inverter')!.value!.toString());
      this.formData.append('description', this.roommateform.get('description')!.value!);
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
    const location = this.roommateform.get('location')
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
  imageError(): any {
    const image = this.roommateform.get('image')
    if (this.selectedImages.length == 0) {
      return 'Select atleast one image of your flat/room'
    }

    return
  }
  //error handling of email field in signup form
  rentError(): any {
    const rent = this.roommateform.get('rent')
    if (!rent?.valid) {
      if (rent?.hasError('required')) {
        return 'rent required'
      }
    }
    return
  }
  genderError(): any {
    const gender = this.roommateform.get('gender')
    if (!gender?.valid) {
      if (gender?.hasError('required')) {
        return 'Please select a gender'
      }
    }
    return
  }
  //error handling of email field in signup form
  mobileError(): any {
    const mobile = this.roommateform.get('contact')
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
    this.UserService.roomMatepostUpdate(this.formData, this.postId).subscribe(
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
