import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostRoommateComponent } from './edit-post-roommate.component';

describe('EditPostRoommateComponent', () => {
  let component: EditPostRoommateComponent;
  let fixture: ComponentFixture<EditPostRoommateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPostRoommateComponent]
    });
    fixture = TestBed.createComponent(EditPostRoommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
