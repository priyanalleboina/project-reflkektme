import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerDashboardComponent } from './influencer-dashboard.component';

describe('InfluencerDashboardComponent', () => {
  let component: InfluencerDashboardComponent;
  let fixture: ComponentFixture<InfluencerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
