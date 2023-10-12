import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementComponent } from './requirement.component';

describe('RequirementComponent', () => {
  let component: RequirementComponent;
  let fixture: ComponentFixture<RequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequirementComponent]
    });
    fixture = TestBed.createComponent(RequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
