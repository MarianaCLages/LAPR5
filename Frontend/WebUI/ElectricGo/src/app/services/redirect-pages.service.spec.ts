import { TestBed } from '@angular/core/testing';

import { RedirectPagesService } from './redirect-pages.service';

describe('RedirectPagesService', () => {
  let service: RedirectPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectPagesService);
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });
});
