import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq } from 'src/app/store/action';
import { roompostSelectorData } from 'src/app/store/selector';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flatpost',
  templateUrl: './flatpost.component.html',
  styleUrls: ['./flatpost.component.css']
})
export class FlatpostComponent {
  roomposts$!: Observable<any[]>
  tic: boolean = true

  constructor(private store: Store<{ posts: any[] }>, private router: Router) { }
  ngOnInit(): void {
    this.store.dispatch(fetchRoomReq())
    this.roomposts$ = this.store.pipe(select(roompostSelectorData))
    console.log(this.roomposts$+'kkkk');
    
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
