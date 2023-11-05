import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { fetchRoomReq } from 'src/app/store/action';
import { roompostSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-detailed-view-room',
  templateUrl: './detailed-view-room.component.html',
  styleUrls: ['./detailed-view-room.component.css']
})
export class DetailedViewRoomComponent {
  roomPost$!: Observable<any[]>
  postId: string = ''
  currentImageindex!: number
  prev: boolean = true

  constructor(private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>,
    private UserService: UserServiceService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      console.log(this.postId);
    })
    this.store.dispatch(fetchRoomReq())
    this.roomPost$ = this.store.pipe(select(roompostSelectorData))
    this.roomPost$ = this.roomPost$.pipe(
      map((posts) => posts.filter((post) => post._id == this.postId))
    );

  }
}
