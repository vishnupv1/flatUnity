import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostFlatComponent } from './viewpost-flat.component';

describe('ViewpostFlatComponent', () => {
  let component: ViewpostFlatComponent;
  let fixture: ComponentFixture<ViewpostFlatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpostFlatComponent]
    });
    fixture = TestBed.createComponent(ViewpostFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
