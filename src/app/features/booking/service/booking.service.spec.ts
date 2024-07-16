import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Booking } from '../model/booking';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { BookingApiService } from './booking-api.service';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  let mockBookingApiService: BookingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), BookingApiService]
    });

    mockBookingApiService = TestBed.inject(BookingApiService);
    service = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bookings', fakeAsync(() => {
    // ARRANGE
    let result: Booking[] | undefined;

    spyOn(mockBookingApiService, 'getBookings').and.returnValue(of(MOCK_BOOKINGS));
    tick();

    // ACT
    service.getBookings().subscribe((bookings: Booking[]) => {
      result = bookings;
    });
    tick();

    // ASSERT
    expect(result).toEqual(MOCK_BOOKINGS);
  }));

  it('should get empty bookings', fakeAsync(() => {
    // ARRANGE
    let result: Booking[] | undefined;

    spyOn(mockBookingApiService, 'getBookings').and.returnValue(of([]));
    tick();

    // ACT
    service.getBookings().subscribe((bookings: Booking[]) => {
      result = bookings;
    });
    tick();

    // ASSERT
    expect(result).toEqual([]);
  }));
});
