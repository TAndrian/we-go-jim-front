import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { JOHN_DOE_MOCK } from '../../user/util/UserMock';
import { UserBookingHistory } from '../model/user-booking-history';
import { MOCK_JOHN_BOOKING_HISTORIES } from '../util/history-mock';
import { HistoryApiService } from './history-api.service';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let spyApiService: HistoryApiService;
  let spyHttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HistoryApiService, HttpClient]
    });
    service = TestBed.inject(HistoryService);
    spyApiService = TestBed.inject(HistoryApiService);
    spyHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get user's booking history", fakeAsync(() => {
    // ARRANGE
    let result: UserBookingHistory[] | undefined;

    spyOn(spyApiService, 'getUserBookingHistories').and.returnValue(
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

  it('should catch HttpErrorResponse status 0', fakeAsync(() => {
    // ARRANGE
    let errorResponse: HttpErrorResponse = new HttpErrorResponse({
      status: 0
    });
    spyOn(spyHttpClient, 'get').and.returnValue(throwError(() => errorResponse));

    // ACT
    service.getUserBookingHistories(JOHN_DOE_MOCK.id).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(errorResponse.status);
      }
    });

    // ASSERT
    expect(service.isLoading).toBeTrue();
  }));
});
