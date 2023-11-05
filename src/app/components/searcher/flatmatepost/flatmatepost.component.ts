import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flatmatepost',
  templateUrl: './flatmatepost.component.html',
  styleUrls: ['./flatmatepost.component.css']
})
export class FlatmatepostComponent {
  posts$!: Observable<any[]>
  tic: boolean = true

  constructor(private store: Store<{ posts: any[] }>, private router: Router) { }
  ngOnInit(): void {
    this.store.dispatch(fetchRoommateReq())
    this.posts$ = this.store.pipe(select(postSelectorData))
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  openDetailedView(id: string) {
    this.router.navigate([`/detailedPost/${id}`])
  }
}
