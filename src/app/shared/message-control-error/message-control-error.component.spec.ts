import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageControlErrorComponent } from './message-control-error.component';

describe('MessageControlErrorComponent', () => {
  let component: MessageControlErrorComponent;
  let fixture: ComponentFixture<MessageControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageControlErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve validar o component', () => {
    expect(component).toBeTruthy();
  });
});
