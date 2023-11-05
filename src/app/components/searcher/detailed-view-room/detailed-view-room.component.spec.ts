import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedViewRoomComponent } from './detailed-view-room.component';

describe('DetailedViewRoomComponent', () => {
  let component: DetailedViewRoomComponent;
  let fixture: ComponentFixture<DetailedViewRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedViewRoomComponent]
    });
    fixture = TestBed.createComponent(DetailedViewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
