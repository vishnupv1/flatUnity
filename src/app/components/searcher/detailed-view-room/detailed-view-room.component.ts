import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { fetchProfile, fetchRoomReq } from 'src/app/store/action';
import { profileSelectorData, roompostSelectorData } from 'src/app/store/selector';
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
  name!: string
  id!: string
  is_premium!: boolean
  profile$!: Observable<any[]>


  constructor(private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>,
    private UserService: UserServiceService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    })
    this.store.dispatch(fetchRoomReq())
    this.roomPost$ = this.store.pipe(select(roompostSelectorData))
    this.roomPost$ = this.roomPost$.pipe(
      map((posts) => posts.filter((post) => post._id == this.postId))
    );
    this.store.dispatch(fetchProfile())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => {
      if (data.length > 0) {
        this.name = data[0].name;
        this.id = data[0]._id;
        this.is_premium = data[0].is_premium;
      }
    });
  }
}
