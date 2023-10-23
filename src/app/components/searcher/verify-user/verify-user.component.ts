import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';


@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent {
  constructor(private route: ActivatedRoute, private service: UserServiceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['id'];
      this.service.verifyUser(email).subscribe()
    });
  }

}
