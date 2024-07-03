import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { BookingApiService } from './booking-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  public bookings$: Observable<Booking[]> = this.bookingsSubject.asObservable();

  constructor(private bookingApiService: BookingApiService) {
    this.loadBookings();
  }

  /**
   * Load bookings and initialize bookings' initial values/
   */
  private loadBookings(): void {
    this.bookingApiService.getBookings().subscribe((bookings) => {
      this.bookingsSubject.next(bookings);
    });
  }

  /**
   *
   * @returns Observable of bookings fetched from the back-end service.
   */
  getBookings(): Observable<Booking[]> {
    return this.bookings$;
  }
}
