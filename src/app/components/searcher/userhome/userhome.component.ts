import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UrlSegment } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { fetchRoomReq, fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData, roompostSelectorData } from 'src/app/store/selector';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  isHomeRoute!: boolean;
  searchValue: string = ''
  roomposts$!: Observable<any[]>
  roomMateposts$!: Observable<any[]>
  addGreyBackgroundflat: boolean = false;
  addGreyBackgroundflatmate: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.updateBackgroundFlags(currentRoute);
      }
    });
  }

  ngOnInit(): void {
    this.routeFinder()
    // this.store.dispatch(fetchRoomReq())
    // this.roomposts$ = this.store.pipe(select(roompostSelectorData))

    // this.store.dispatch(fetchRoommateReq())
    // this.roomMateposts$ = this.store.pipe(select(postSelectorData))
  }

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

  searchTrigger(value: string) {

  }
  NavigateTo(route: string) {
    this.router.navigate([route])
  }
}
