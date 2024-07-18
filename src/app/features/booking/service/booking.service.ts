import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { BookingApiService } from './booking-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private areBookingsLoaded: boolean = false;
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);

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
}
