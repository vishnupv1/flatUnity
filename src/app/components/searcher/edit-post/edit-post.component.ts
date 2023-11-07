import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq, fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData, roompostSelectorData } from 'src/app/store/selector';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  roompost$!: Observable<any[]>
  postData: any = {}
  roomform!: FormGroup
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
      this.store.dispatch(fetchRoomReq())
      this.roompost$ = this.store.pipe(select(roompostSelectorData))
      this.roompost$ = this.roompost$.pipe(
        map((posts) => posts.filter((post) => post._id == this.postId))
      );
    });

    interface InitialData { }


    this.roompost$.subscribe(data => {
      if (data && data.length > 0) {
        const initialData: InitialData = data[0];

        this.postData = { ...initialData };
      }
      const submit: boolean = false

      var date = new Date(this.postData.date);
      this.formattedDate = this.datePipe.transform(date, "yyyy-MM-dd")
      this.roomform = this.fb.group({
        location: [this.postData.location, [Validators.required, Validators.minLength(5)]],
        gender: [this.postData.gender, [Validators.required]],
        rent: [this.postData.rent, [Validators.required]],
        contact: [this.postData.mobile, [Validators.required]],
        date: [this.formattedDate, [Validators.required]],
        description: this.postData.description
      })
    });

  }


  onSubmit() {
    if (!this.roomform.valid) {
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
    const location = this.roomform.get('location')
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
    const rent = this.roomform.get('rent')
    if (!rent?.valid) {
      if (rent?.hasError('required')) {
        return 'rent required'
      }
    }
    return
  }
  genderError(): any {
    const gender = this.roomform.get('gender')
    if (!gender?.valid) {
      if (gender?.hasError('required')) {
        return 'Please select a gender'
      }
    }
    return
  }
  //error handling of email field in signup form
  mobileError(): any {
    const mobile = this.roomform.get('contact')
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
    this.UserService.updateRoomPost(this.roomform.value, this.postId).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.router.navigate(['flatpostMod'])
      }, (error) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
}
