import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatRentReqComponent } from './flat-rent-req.component';

describe('FlatRentReqComponent', () => {
  let component: FlatRentReqComponent;
  let fixture: ComponentFixture<FlatRentReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatRentReqComponent]
    });
    fixture = TestBed.createComponent(FlatRentReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
