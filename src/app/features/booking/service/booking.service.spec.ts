import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { BookingApiService } from './booking-api.service';
import { of } from 'rxjs';
import { MOCK_BOOKINGS, MOCK_JOHN_BOOKING_HISTORIES } from '../util/mock/BookingMocks';
import { Booking } from '../model/booking';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserBookingHistory } from '../model/UserBookingHistory';
import { JOHN_DOE_MOCK } from '../../user/util/UserMock';

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

  it("should get user's booking history", fakeAsync(() => {
    // ARRANGE
    let result: UserBookingHistory[] | undefined;

    spyOn(mockBookingApiService, 'getUserBookingHistories').and.returnValue(
      of(MOCK_JOHN_BOOKING_HISTORIES)
    );
    tick();

    // ACT
    service
      .getUserBookingHistories(JOHN_DOE_MOCK.id)
      .subscribe((histories: UserBookingHistory[]) => {
        result = histories;
      });

    // ASSERT
    expect(result).toEqual(MOCK_JOHN_BOOKING_HISTORIES);
  }));
});
