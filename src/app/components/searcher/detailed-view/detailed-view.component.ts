import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { fetchProfile, fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData, profileSelectorData } from 'src/app/store/selector';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { ChatboxInidvidualComponent } from '../chatbox-inidvidual/chatbox-inidvidual.component';


@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent {
  roomMatePost$!: Observable<any[]>
  profile$!: Observable<any[]>
  postId: string = ''
  currentImageindex!: number
  prev: boolean = true
  name!: string
  id!: string
  is_premium!: boolean

  constructor(private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>,
    private UserService: UserServiceService,
    private router: Router,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.currentImageindex = 0
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.store.dispatch(fetchRoommateReq())
      this.roomMatePost$ = this.store.pipe(select(postSelectorData))
      this.roomMatePost$ = this.roomMatePost$.pipe(
        map((posts) => posts.filter((post) => post._id == this.postId))
      );
    });
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

  prevImage() {
    this.currentImageindex--
  }
  nextImage() {
    this.currentImageindex++

  }
  openChatBox(recieverId: string, senderId: string, recieverName: string, recieverGender: string): void {

    const dialogRef = this.dialog.open(ChatboxInidvidualComponent, {
      data: { senderId, recieverId, recieverName, recieverGender }

    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
