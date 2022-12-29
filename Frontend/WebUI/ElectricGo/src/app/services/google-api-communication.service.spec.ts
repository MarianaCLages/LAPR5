import { TestBed } from '@angular/core/testing';

import { GoogleApiCommunicationService } from './google-api-communication.service';

describe('GoogleApiCommunicationService', () => {
  let service: GoogleApiCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApiCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
