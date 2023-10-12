import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent {
  constructor(private router: Router) { }

  menuExpanded: boolean = false

  onMenuClick() {
    this.menuExpanded = true
  }
  logOutcall() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userNum')
    this.router.navigate([''])
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
