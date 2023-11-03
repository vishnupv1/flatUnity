import { Component, OnInit } from '@angular/core';
import { Observable ,map} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq, fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData, roompostSelectorData } from 'src/app/store/selector';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activitylog-room',
  templateUrl: './activitylog-room.component.html',
  styleUrls: ['./activitylog-room.component.css']
})
export class ActivitylogRoomComponent {
  roomPost$!: Observable<any[]>
  userMobile = localStorage.getItem('userNum')


  constructor(private store: Store<{ posts: any[] }>, private dialog: MatDialog, private userService: UserServiceService, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {
    this.store.dispatch(fetchRoomReq())
    this.roomPost$ = this.store.pipe(select(roompostSelectorData))
    this.roomPost$ = this.roomPost$.pipe(
      map((posts) => posts.filter((post) => post.mobile == this.userMobile))
    );
  }

  openDeleteConfirmation(id: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deletePost(id)
      }
    });
  }
  deletePost(id: any) {
    this.userService.deleteRoomPost(id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Requirement Deleted', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.store.dispatch(fetchRoomReq())
      }
    )
  }
  updatePost(id: string) {
    this.route.navigate([`/editpost/${id}`])
  }
}
