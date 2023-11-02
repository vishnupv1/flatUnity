import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  showUserManagement: boolean = false;
  showFlatfeed: boolean = false;
  showFlatmatefeed: boolean = false;
  showsales: boolean = false;
  showPref: boolean = false;
  showPlans: boolean = false;

  constructor(private router: ActivatedRoute, private adminService: AdminServiceService) {

  }
  ngOnInit() {
    this.router.url.subscribe(segments => {
      this.showUserManagement = segments.some(segment => segment.path === 'users');
      this.showFlatfeed = segments.some(segment => segment.path === 'flatfeed');
      this.showFlatmatefeed = segments.some(segment => segment.path === 'flatMatefeed');
      this.showPlans = segments.some(segment => segment.path === 'plans');
    });
  }

  logOutAdmin() {
    localStorage.removeItem('adminToken')
  }


}
