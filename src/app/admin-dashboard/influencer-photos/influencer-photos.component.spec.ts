import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerPhotosComponent } from './influencer-photos.component';

describe('InfluencerPhotosComponent', () => {
  let component: InfluencerPhotosComponent;
  let fixture: ComponentFixture<InfluencerPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
