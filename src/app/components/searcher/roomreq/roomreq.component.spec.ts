import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomreqComponent } from './roomreq.component';

describe('RoomreqComponent', () => {
  let component: RoomreqComponent;
  let fixture: ComponentFixture<RoomreqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomreqComponent]
    });
    fixture = TestBed.createComponent(RoomreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
