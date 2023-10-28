import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchProfile } from 'src/app/store/action';
import { profileSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { Profile } from 'src/app/store/state';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile$!: Observable<any[]>
  profileData$!: Observable<{ name: string, email: string, mobile: string }[]>;
  name = ''
  email = ''
  mobile = ''
  constructor(private store: Store<{ profile: any[] }>, private fb: FormBuilder, private UserService: UserServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store.dispatch(fetchProfile())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if (data.length > 0) {
        this.name = data[0].name;
        this.email = data[0].email;
        this.mobile = data[0].mobile;
        this.profileForm.patchValue(data[0]);
      }
    });
  }

  profileForm = this.fb.group({
    name: [this.name, [Validators.required, Validators.minLength(5)]],
    email: [this.email, [Validators.required, Validators.minLength(5)]],
    mobile: [this.mobile, [Validators.required, Validators.minLength(5)]],
  })
  onSubmit() {
    const formData = this.profileForm.value
    this.UserService.updateProfile(formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Updated', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.router.navigate(['profile'])
      }, (error: any) => {
        console.log(error);

        this.toastr.error(error.error.message, 'Error', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
}
