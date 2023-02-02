import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgToComponent } from './msg-to.component';

describe('MsgToComponent', () => {
  let component: MsgToComponent;
  let fixture: ComponentFixture<MsgToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgToComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
