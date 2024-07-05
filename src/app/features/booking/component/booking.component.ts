import { Component } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking';
import { Subscription } from 'rxjs';
import { UserBookingHistory } from '../model/UserBookingHistory';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: Booking[] = [];
  userBookingHistories: UserBookingHistory[] = [];
  subscription: Subscription = new Subscription();

  constructor(private readonly _bookingService: BookingService) {}

  ngOnInit(): void {
    this.initializeBookings();
    this.initializeBookingHistory();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initialize bookings to display on the scheduler.
   */
  private initializeBookings(): void {
    this.subscription = this._bookingService.getBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }

  /**
   * Initialize user's booking histories.
   */
  private initializeBookingHistory(): void {
    this.subscription = this._bookingService
      .getUserBookingHistories('8cfef374-700d-4d57-8fe8-688b976458e4')
      .subscribe((data: UserBookingHistory[]) => {
        this.userBookingHistories = data;
      });
  }
}
