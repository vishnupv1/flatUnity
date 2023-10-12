import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommatereqComponent } from './roommatereq.component';

describe('RoommatereqComponent', () => {
  let component: RoommatereqComponent;
  let fixture: ComponentFixture<RoommatereqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoommatereqComponent]
    });
    fixture = TestBed.createComponent(RoommatereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
