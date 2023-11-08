import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxInidvidualComponent } from './chatbox-inidvidual.component';

describe('ChatboxInidvidualComponent', () => {
  let component: ChatboxInidvidualComponent;
  let fixture: ComponentFixture<ChatboxInidvidualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatboxInidvidualComponent]
    });
    fixture = TestBed.createComponent(ChatboxInidvidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
