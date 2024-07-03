import { TestBed } from '@angular/core/testing';

import { BookingApiService } from './booking-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingApiService', () => {
  let service: BookingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BookingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
