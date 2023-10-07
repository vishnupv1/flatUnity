import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  isActive: boolean = true
  constructor(private router: Router) {
    // Subscribe to the router events to track navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the dashboard route
        this.isActive = event.url === '/admin/dashboard'; // Adjust the route as needed
      }
    });
  }
  logOutAdmin() {
    // this.router.navigate(['/'])
    localStorage.removeItem('adminToken')
  }
}
