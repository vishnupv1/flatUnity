import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { plan } from '../../admin/plans/plans.component';
import { Store, select } from '@ngrx/store';
import { fetchProfile } from 'src/app/store/action';
import { Observable } from 'rxjs';
import { profileSelectorData } from 'src/app/store/selector';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {
  plans!: plan[]
  profile$!: Observable<any[]>

  profileData$!: Observable<{
    name: string,
    is_premium: string,
    mobile: string,
    subscriptionEnds: Date,
    subscriptionStarts: Date,
    subPlanName: string
  }[]>;
  name = ''
  is_premium = ''
  subscriptionEnds!: Date
  subscriptionStarts!: Date
  mobile = ''
  duration!: number
  planName!: string
  subPlanName!: string
  constructor(private adminService: AdminServiceService, private store: Store<{ profile: any[] }>, private userService: UserServiceService) { }
  ngOnInit(): void {
    this.store.dispatch(fetchProfile())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if (data.length > 0) {
        this.name = data[0].name;
        this.is_premium = data[0].is_premium;
        this.subscriptionEnds = data[0].subscriptionEnds;
        this.subscriptionStarts = data[0].subscriptionStarts;
        this.mobile = data[0].mobile;
        this.subPlanName = data[0].planName;
      }
    });
    this.adminService.loadPlans().subscribe((res) => {
      this.plans = res.plans
    })
  }
  SubscribePremium(amount: number, name: string, duration: string, planName: string) {
    const mobile = this.mobile
    const data = { amount, name, mobile, duration, planName }
    this.userService.SubscribePremium(data).subscribe((res) => {
      if (res.success) {
        this.duration = res.duration
        this.planName = res.planName
        const options = {
          description: 'flatUnity Subscription',
          image: '',
          currency: 'INR',
          key: res.key_id,
          amount: res.amount,
          duration: res.duration,
          name: 'flatUnity',
          prefill: {
            email: res.email,
            name: res.name,
            mobile: res.mobile,
          },
          theme: {
            color: '#9b58ed',
          },
          modal: {
            ondismiss: () => {
              alert('Payment was dismissed');
            },
          },
          handler: this.paymentSuccess.bind(this),

        };
        const rzp = new Razorpay(options);
        rzp.open();
      }

      else {
        alert(res.message);
      }
    })

  }
  paymentSuccess() {
    this.userService.paymentUpdate(this.duration, this.planName).subscribe((res) => {

    })
  }
}
