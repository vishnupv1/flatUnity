import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { plan } from '../../admin/plans/plans.component';
import { Store, select } from '@ngrx/store';
import { fetchProfile } from 'src/app/store/action';
import { Observable } from 'rxjs';
import { profileSelectorData } from 'src/app/store/selector';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {
  plans!: plan[]
  profile$!: Observable<any[]>
  profileData$!: Observable<{ name: string, email: string, mobile: string }[]>;
  name = ''
  is_premium = ''
  constructor(private adminService: AdminServiceService, private store: Store<{ profile: any[] }>) { }
  ngOnInit(): void {
    this.store.dispatch(fetchProfile())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if (data.length > 0) {
        this.name = data[0].name;
        this.is_premium = data[0].is_premium;
      }
    });
    this.adminService.loadPlans().subscribe((res) => {
      this.plans = res.plans
    })
  }
}
