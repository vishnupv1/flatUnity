import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchRoommateReq } from 'src/app/store/action';
import { postSelectorData } from 'src/app/store/selector';
import { ViewpostFlatmateComponent } from '../viewpost-flatmate/viewpost-flatmate.component';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flat-matefeeds',
  templateUrl: './flat-matefeeds.component.html',
  styleUrls: ['./flat-matefeeds.component.css']
})
export class FlatMatefeedsComponent {
  posts$!: Observable<any[]>

  constructor(private store: Store<{ posts: any[] }>,
    private dialog: MatDialog,
    private adminService: AdminServiceService,
    private toastr: ToastrService


  ) {
  }
  ngOnInit(): void {
    this.store.dispatch(fetchRoommateReq())
    this.posts$ = this.store.pipe(select(postSelectorData))
  }
  unBlockpost(id: string) {
    this.adminService.unBlockOrBlockPost(id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.store.dispatch(fetchRoommateReq())
      }
    )

  }
  viewPost(id: string) {
    const dialogRef = this.dialog.open(ViewpostFlatmateComponent, {
      data: { id }

    });
    dialogRef.afterClosed().subscribe((result) => {

    });

  }
}
