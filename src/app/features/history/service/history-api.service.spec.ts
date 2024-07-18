import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HistoryApiService } from './history-api.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { JOHN_DOE_MOCK } from '../../user/util/UserMock';
import { UserBookingHistory } from '../model/user-booking-history';
import { MOCK_JOHN_BOOKING_HISTORIES } from '../util/history-mock';

describe('HistoryApiService', () => {
  let service: HistoryApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(), provideHttpClientTesting(),  HttpClient]
    });
    service = TestBed.inject(HistoryApiService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

    afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
