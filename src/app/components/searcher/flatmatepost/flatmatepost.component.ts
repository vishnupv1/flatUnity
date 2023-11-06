import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-flatmatepost',
  templateUrl: './flatmatepost.component.html',
  styleUrls: ['./flatmatepost.component.css']
})
export class FlatmatepostComponent {
  posts$!: Observable<any[]>
  tic: boolean = true
  addGreyBackgroundflat: boolean = false;
  addGreyBackgroundflatmate: boolean = false;
  searchValue: string = ''
  searchPosts$ !: Observable<any[]>


  constructor(private store: Store<{ posts: any[] }>,
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.updateBackgroundFlags(currentRoute);
      }
    });
  }
  ngOnInit(): void {
    this.store.dispatch(fetchRoommateReq())
    this.posts$ = this.store.pipe(select(postSelectorData))
    this.searchPosts$ = this.posts$
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
    this.router.navigate([`/detailedPost/${id}`])
  }
  searchTrigger(value: string) {
    this.posts$ = this.searchPosts$.pipe(
      map((posts) => posts.filter((post) =>
        post.ownerName.toLowerCase().includes(value.toLowerCase()) ||
        post.location.toLowerCase().includes(value.toLowerCase())
      ))
    );
  }
}
