import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { BookingApiService } from './booking-api.service';
import { of } from 'rxjs';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { Booking } from '../model/booking';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

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

    /* Mock BookingApiService to return MOCK_BOOKINGS then call loadBookings to
     * to make it returns the MOCK_BOOKINGS
     */
    spyOn(mockBookingApiService, 'getBookings').and.returnValue(of(MOCK_BOOKINGS));
    service['loadBookings']();
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
    service['loadBookings']();
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
