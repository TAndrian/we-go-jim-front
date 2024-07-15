import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserBookingHistory } from '../model/user-booking-history';
import { BookingApiService } from '../../booking/service/booking-api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private userBookingHistoriesMap: Map<string, BehaviorSubject<UserBookingHistory[]>> = new Map();

  constructor(private readonly _bookingApiService: BookingApiService) {}

  /**
   * Load user's booking histories based on the given userId.
   * @param userId user id.
   */
  private loadUserBookingHistories(userId: string): void {
    if (!this.userBookingHistoriesMap.has(userId)) {
      const userBookingHistoriesSubject: BehaviorSubject<UserBookingHistory[]> =
        new BehaviorSubject<UserBookingHistory[]>([]);

      this.userBookingHistoriesMap.set(userId, userBookingHistoriesSubject);

      this._bookingApiService
        .getUserBookingHistories(userId)
        .subscribe((histories: UserBookingHistory[]) => {
          userBookingHistoriesSubject.next(histories);
        });
    }
  }

  /**
   * Get user's booking histories based on the given userId.
   *
   * @param userId user id.
   * @returns observable of array of UserBookingHistory.
   */
  getUserBookingHistories(userId: string): Observable<UserBookingHistory[]> {
    this.loadUserBookingHistories(userId);
    return this.userBookingHistoriesMap.get(userId)!.asObservable();
  }
}
