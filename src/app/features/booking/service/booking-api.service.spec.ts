import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookingApiService } from './booking-api.service';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { API_BOOKINGS } from '../util/BookingResourcePath';
import { Booking } from '../model/booking';
import { ENVIRONMENT } from '../../../environments/environment';
import { of } from 'rxjs';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';

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
});
