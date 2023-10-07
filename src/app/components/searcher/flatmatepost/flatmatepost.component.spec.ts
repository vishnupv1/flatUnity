import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatmatepostComponent } from './flatmatepost.component';

describe('FlatmatepostComponent', () => {
  let component: FlatmatepostComponent;
  let fixture: ComponentFixture<FlatmatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatmatepostComponent]
    });
    fixture = TestBed.createComponent(FlatmatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
