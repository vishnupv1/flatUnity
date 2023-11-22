import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Socket } from 'socket.io-client';


@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent {
  menuExpanded: boolean = false
  isOnline: boolean = false


  constructor(private router: Router) {

  }

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
