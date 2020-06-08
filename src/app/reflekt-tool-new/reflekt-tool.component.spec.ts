import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflektToolComponent } from './reflekt-tool.component';

describe('ReflektToolComponent', () => {
  let component: ReflektToolComponent;
  let fixture: ComponentFixture<ReflektToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReflektToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflektToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
