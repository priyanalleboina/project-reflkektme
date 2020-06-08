import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerVideosComponent } from './influencer-videos.component';

describe('InfluencerVideosComponent', () => {
  let component: InfluencerVideosComponent;
  let fixture: ComponentFixture<InfluencerVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
