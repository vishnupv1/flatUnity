import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  constructor(private route: ActivatedRoute, private store: Store<{ posts: any[] }>) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];


    });
  }

}
