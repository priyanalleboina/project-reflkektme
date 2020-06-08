import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestModelComponent } from './guest-model.component';

describe('GuestModelComponent', () => {
  let component: GuestModelComponent;
  let fixture: ComponentFixture<GuestModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
