import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  isHomeRoute!: boolean;

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.updateBackgroundFlags(currentRoute);
      }
    });
  }
  ngOnInit(): void {
    this.routeFinder()
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
  routeFinder() {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      this.isHomeRoute = segments.length > 0 && segments[0].path === 'home';
    });
  }


}
