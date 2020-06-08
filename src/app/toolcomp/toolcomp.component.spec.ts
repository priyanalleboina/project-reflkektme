import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolcompComponent } from './toolcomp.component';

describe('ToolcompComponent', () => {
  let component: ToolcompComponent;
  let fixture: ComponentFixture<ToolcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
