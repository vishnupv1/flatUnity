import { Component, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq } from 'src/app/store/action';
import { roompostSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewpost-flat',
  templateUrl: './viewpost-flat.component.html',
  styleUrls: ['./viewpost-flat.component.css']
})
export class ViewpostFlatComponent {
  postId!: string
  currentImageindex!: number

  roomPost$!: Observable<any[]>
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private store: Store<{ posts: any[] }>) {
    this.postId = data.id
  }
  ngOnInit(): void {
    this.currentImageindex = 0
    this.store.dispatch(fetchRoomReq())
    this.roomPost$ = this.store.pipe(select(roompostSelectorData))
    this.roomPost$ = this.roomPost$.pipe(
      map((posts) => posts.filter((post) => post._id == this.postId))
    );
  }

}
