import { TestBed } from '@angular/core/testing';

import { ReflektmeService } from './reflektme.service';

describe('ReflektmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReflektmeService = TestBed.get(ReflektmeService);
    expect(service).toBeTruthy();
  });
});
