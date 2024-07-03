import { Component } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: Booking[] = [];
  subscription: Subscription = new Subscription();

  constructor(private readonly bookingService: BookingService) {}

  ngOnInit(): void {
    this.initializeBookings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initialize bookings to display on the scheduler.
   */
  private initializeBookings() {
    this.subscription = this.bookingService.getBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }
}
