import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs';
import { fetchUser } from 'src/app/store/action';
import { userSelectorData } from 'src/app/store/selector';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent {
  users$!: Observable<any[]>
  constructor(private store: Store<{ allUser: any[] }>, private adminService: AdminServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store.dispatch(fetchUser())
    this.users$ = this.store.pipe(select(userSelectorData))
  }
  unBlockUser(id: any) {
    this.adminService.unBlockUser(id).subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.store.dispatch(fetchUser())
      }
    )
  }
}
