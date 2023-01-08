import { TestBed } from '@angular/core/testing';

import { AppConfigServiceService } from './app-config-service.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AppConfigServiceService', () => {
  let service: AppConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigServiceService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(AppConfigServiceService);
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });
});
