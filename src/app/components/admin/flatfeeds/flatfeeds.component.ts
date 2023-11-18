import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fetchRoomReq } from 'src/app/store/action';
import { roompostSelectorData } from 'src/app/store/selector';
import { ViewpostFlatComponent } from '../viewpost-flat/viewpost-flat.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flatfeeds',
  templateUrl: './flatfeeds.component.html',
  styleUrls: ['./flatfeeds.component.css']
})
export class FlatfeedsComponent {
  posts$!: Observable<any[]>

  constructor(private store: Store<{ posts: any[] }>,
    private dialog: MatDialog

  ) {
  }
  ngOnInit(): void {
    this.store.dispatch(fetchRoomReq())
    this.posts$ = this.store.pipe(select(roompostSelectorData))
  }
  unBlockpost(id: string) {

  }
  viewPost(id: string) {
    const dialogRef = this.dialog.open(ViewpostFlatComponent, {
      data: { id }

    });
    dialogRef.afterClosed().subscribe((result) => {

    });

  }
}
