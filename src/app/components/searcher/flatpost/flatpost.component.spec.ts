import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatpostComponent } from './flatpost.component';

describe('FlatpostComponent', () => {
  let component: FlatpostComponent;
  let fixture: ComponentFixture<FlatpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatpostComponent]
    });
    fixture = TestBed.createComponent(FlatpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
