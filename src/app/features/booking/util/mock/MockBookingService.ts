import { BehaviorSubject, Observable, of } from 'rxjs';
import { Booking } from '../../model/booking';

export class MockBookingService {
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  public bookings$: Observable<Booking[]> = this.bookingsSubject.asObservable();
  private bookings: Booking[] = [];

  /**
   *
   * @returns Mock of bookings.
   */
  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }
}
