import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  constructor(private cdRef: ChangeDetectorRef) {

  }

  flatClicked: boolean = false
  flatmateClicked: boolean = false
}
