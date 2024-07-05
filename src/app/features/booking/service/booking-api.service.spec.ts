import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { JOHN_DOE_MOCK } from '../../user/util/UserMock';
import { UserBookingHistory } from '../model/UserBookingHistory';
import { Booking } from '../model/booking';
import { MOCK_BOOKINGS, MOCK_JOHN_BOOKING_HISTORIES } from '../util/mock/BookingMocks';
import { BookingApiService } from './booking-api.service';

describe('BookingApiService', () => {
  let service: BookingApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), BookingApiService, HttpClient]
    });

    service = TestBed.inject(BookingApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBookings and return bookings', fakeAsync(() => {
    // ARRANGE
    spyOn(httpClient, 'get').and.returnValue(of(MOCK_BOOKINGS));
    tick();

    // ACT
    service.getBookings().subscribe((bookings: Booking[]) => {
      // ASSERT
      expect(bookings).toEqual(MOCK_BOOKINGS);
    });
    tick();
  }));

  it('should call getBookings and return empty array', fakeAsync(() => {
    // ARRANGE
    spyOn(httpClient, 'get').and.returnValue(of([]));
    tick();

    // ACT
    service.getBookings().subscribe((bookings: Booking[]) => {
      // ASSERT
      expect(bookings).toEqual([]);
    });
    tick();
  }));

  it("should call getUserBookingHistories and returns user's booking histories", fakeAsync(() => {
    // ARRANGE
    spyOn(httpClient, 'get').and.returnValues(of(MOCK_JOHN_BOOKING_HISTORIES));
    tick();

    // ACT
    service
      .getUserBookingHistories(JOHN_DOE_MOCK.id)
      .subscribe((histories: UserBookingHistory[]) => {
        expect(histories).toEqual(MOCK_JOHN_BOOKING_HISTORIES);
      });
  }));

  it('should call getUserBookingHistories and returns empty collection', fakeAsync(() => {
    // ARRANGE
    spyOn(httpClient, 'get').and.returnValues(of([]));
    tick();

    // ACT
    service
      .getUserBookingHistories(JOHN_DOE_MOCK.id)
      .subscribe((histories: UserBookingHistory[]) => {
        expect(histories).toEqual([]);
      });
  }));
});
