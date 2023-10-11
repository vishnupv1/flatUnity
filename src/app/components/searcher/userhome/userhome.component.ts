import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the route and set the booleans accordingly
        const currentRoute = this.router.url;
        this.updateBackgroundFlags(currentRoute);
      }
    });
  }

  addGreyBackgroundflat: boolean = false;
  addGreyBackgroundflatmate: boolean = false;
  private updateBackgroundFlags(currentRoute: string) {
    if (currentRoute === '/flatpost') {
      this.addGreyBackgroundflat = true;
      this.addGreyBackgroundflatmate = false;
    } else if (currentRoute === '/flatmatepost') {
      this.addGreyBackgroundflat = false;
      this.addGreyBackgroundflatmate = true;
    } else {
      this.addGreyBackgroundflat = false;
      this.addGreyBackgroundflatmate = false;
    }
  }
}
