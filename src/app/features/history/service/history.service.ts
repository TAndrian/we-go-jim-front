import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry } from 'rxjs';
import { UserBookingHistory } from '../model/user-booking-history';
import { HistoryApiService } from './history-api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private readonly _historyApiService: HistoryApiService) {}

  isLoading!: boolean;

  userBookingHistoriesSubject: BehaviorSubject<UserBookingHistory[]> = new BehaviorSubject<
    UserBookingHistory[]
  >([]);

  /**
   * Get user's booking histories based on the given userId.
   * @param userId user id.
   */
  getUserHistories$(userId: string): void {
    this.isLoading = true;
    this._historyApiService
      .getUserBookingHistories(userId)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          this.isLoading = true;
          console.error(error);
          return [];
        })
      )
      .subscribe((data: UserBookingHistory[]) => {
        this.isLoading = false;
        this.userBookingHistoriesSubject.next(data);
      });
  }

  /**
   * Get user's booking histories based on the given userId.
   *
   * @param userId user id.
   * @returns observable of array of UserBookingHistory.
   */
  getUserBookingHistories(userId: string): Observable<UserBookingHistory[]> {
    this.getUserHistories$(userId);
    return this.userBookingHistoriesSubject.asObservable();
  }
}
