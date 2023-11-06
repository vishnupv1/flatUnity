import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq } from 'src/app/store/action';
import { roompostSelectorData } from 'src/app/store/selector';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-flatpost',
  templateUrl: './flatpost.component.html',
  styleUrls: ['./flatpost.component.css']
})
export class FlatpostComponent {
  roomposts$!: Observable<any[]>
  searchPosts$!: Observable<any[]>
  addGreyBackgroundflat: boolean = false;
  addGreyBackgroundflatmate: boolean = false;
  searchValue: string = ''

  constructor(
    private store: Store<{ posts: any[] }>,
    private router: Router,
    private route: ActivatedRoute,) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.updateBackgroundFlags(currentRoute);
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(fetchRoomReq())
    this.roomposts$ = this.store.pipe(select(roompostSelectorData))
    this.searchPosts$ = this.roomposts$

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
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  openDetailedView(id: string) {
    this.router.navigate([`/detailedroomPost/${id}`])
  }

  searchTrigger(value: string) {
    this.roomposts$ = this.searchPosts$.pipe(
      map((posts) => posts.filter((post) =>
        post.ownerName.toLowerCase().includes(value.toLowerCase()) ||
        post.location.toLowerCase().includes(value.toLowerCase())
      ))
    );
  }
}
