import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent {
  constructor(private router: Router) { }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
