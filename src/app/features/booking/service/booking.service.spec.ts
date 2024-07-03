import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BookingService } from './booking.service';
import { BookingApiService } from './booking-api.service';

describe('BookingService', () => {
  let service: BookingService;
  let mockBookingApiService: jasmine.SpyObj<BookingApiService>;

  beforeEach(() => {
    const spyBookingApiService = jasmine.createSpyObj('BookingApiService', ['getBookings']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BookingApiService,
          useuseValue: spyBookingApiService
        }
      ]
    });
    //mockBookingApiService = TestBed.inject(BookingApiService) as jasmine.SpyObj<BookingApiService>;
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
