import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HistoryService } from './history.service';
import { HistoryApiService } from './history-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { JOHN_DOE_MOCK } from '../../user/util/UserMock';
import { UserBookingHistory } from '../model/user-booking-history';
import { MOCK_JOHN_BOOKING_HISTORIES } from '../util/history-mock';

describe('HistoryService', () => {
  let service: HistoryService;
  let apiService:HistoryApiService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(), provideHttpClientTesting(), HistoryApiService]
    });
    service = TestBed.inject(HistoryService);
    apiService = TestBed.inject(HistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it("should get user's booking history", fakeAsync(() => {
    // ARRANGE
    let result: UserBookingHistory[] | undefined;

    spyOn(apiService, 'getUserBookingHistories').and.returnValue(of(MOCK_JOHN_BOOKING_HISTORIES))
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
