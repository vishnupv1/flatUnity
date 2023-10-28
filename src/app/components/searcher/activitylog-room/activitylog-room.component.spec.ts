import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylogRoomComponent } from './activitylog-room.component';

describe('ActivitylogRoomComponent', () => {
  let component: ActivitylogRoomComponent;
  let fixture: ComponentFixture<ActivitylogRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitylogRoomComponent]
    });
    fixture = TestBed.createComponent(ActivitylogRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
