import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent {
  roomMatePost$!: Observable<any[]>
  postId: string = ''
  currentImageindex!: number
  prev: boolean = true

  constructor(private route: ActivatedRoute,
    private store: Store<{ posts: any[] }>,
    private UserService: UserServiceService,
    private router: Router,
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
  }

  prevImage() {
    this.currentImageindex--
  }
  nextImage() {
    this.currentImageindex++

  }
}
