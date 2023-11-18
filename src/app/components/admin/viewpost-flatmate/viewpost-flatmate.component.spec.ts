import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostFlatmateComponent } from './viewpost-flatmate.component';

describe('ViewpostFlatmateComponent', () => {
  let component: ViewpostFlatmateComponent;
  let fixture: ComponentFixture<ViewpostFlatmateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpostFlatmateComponent]
    });
    fixture = TestBed.createComponent(ViewpostFlatmateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
