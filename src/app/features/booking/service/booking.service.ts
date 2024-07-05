import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { BookingApiService } from './booking-api.service';
import { UserBookingHistory } from '../model/UserBookingHistory';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private areBookingsLoaded: boolean = false;
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);

  private userBookingHistoriesMap: Map<string, BehaviorSubject<UserBookingHistory[]>> = new Map();

  constructor(private _bookingApiService: BookingApiService) {}

  /**
   * Load bookings and initialize bookings' initial values/
   */
  private loadBookings(): void {
    if (!this.areBookingsLoaded) {
      this._bookingApiService.getBookings().subscribe((bookings: Booking[]) => {
        this.bookingsSubject.next(bookings);
        this.areBookingsLoaded = true;
      });
    }
  }

  /**
   * @returns Observable of bookings fetched from the back-end service.
   */
  getBookings(): Observable<Booking[]> {
    this.loadBookings();
    return this.bookingsSubject.asObservable();
  }

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
