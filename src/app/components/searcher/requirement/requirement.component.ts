import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { fetchProfile } from 'src/app/store/action';
import { Observable } from 'rxjs';
import { profileSelectorData } from 'src/app/store/selector';


@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent {
  constructor(private router: Router, private store: Store<{ profile: any[] }>, private fb: FormBuilder, private UserService: UserServiceService, private toastr: ToastrService) { }
  profile$!: Observable<any[]>
  userType = ''

  ngOnInit(): void {
    this.store.dispatch(fetchProfile())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if (data.length > 0) {
        this.userType = data[0].userType;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
