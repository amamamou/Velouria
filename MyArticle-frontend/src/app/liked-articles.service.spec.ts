import { TestBed } from '@angular/core/testing';

import { LikedArticlesService } from './liked-articles.service';

describe('LikedArticlesService', () => {
  let service: LikedArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
