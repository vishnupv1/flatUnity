import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatMatefeedsComponent } from './flat-matefeeds.component';

describe('FlatMatefeedsComponent', () => {
  let component: FlatMatefeedsComponent;
  let fixture: ComponentFixture<FlatMatefeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatMatefeedsComponent]
    });
    fixture = TestBed.createComponent(FlatMatefeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
