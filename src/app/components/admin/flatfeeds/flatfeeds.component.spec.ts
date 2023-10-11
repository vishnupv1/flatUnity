import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatfeedsComponent } from './flatfeeds.component';

describe('FlatfeedsComponent', () => {
  let component: FlatfeedsComponent;
  let fixture: ComponentFixture<FlatfeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatfeedsComponent]
    });
    fixture = TestBed.createComponent(FlatfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
