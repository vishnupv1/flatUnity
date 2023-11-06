import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeleteConfirmationComponent } from './plan-delete-confirmation.component';

describe('PlanDeleteConfirmationComponent', () => {
  let component: PlanDeleteConfirmationComponent;
  let fixture: ComponentFixture<PlanDeleteConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanDeleteConfirmationComponent]
    });
    fixture = TestBed.createComponent(PlanDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
