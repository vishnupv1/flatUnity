import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-viewpost-flatmate',
  templateUrl: './viewpost-flatmate.component.html',
  styleUrls: ['./viewpost-flatmate.component.css']
})
export class ViewpostFlatmateComponent {
  postId!: string
  currentImageindex!: number

  roomMatePost$!: Observable<any[]>
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private store: Store<{ posts: any[] }>) {
    this.postId = data.id
  }
  ngOnInit(): void {
    this.currentImageindex = 0
    this.store.dispatch(fetchRoommateReq())
    this.roomMatePost$ = this.store.pipe(select(postSelectorData))
    this.roomMatePost$ = this.roomMatePost$.pipe(
      map((posts) => posts.filter((post) => post._id == this.postId))
    );
  }
  prevImage() {
    this.currentImageindex--
  }
  nextImage() {
    this.currentImageindex++

  }
}
