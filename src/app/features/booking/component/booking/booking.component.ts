import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';
import { Booking } from '../../model/booking';
import { BookingService } from '../../service/booking.service';

import { DatePipe } from '@angular/common';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FullCalendarModule, BookingCalendarComponent],
  providers: [DatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: Booking[] = [];

  subscription: Subscription = new Subscription();

  constructor(private readonly _bookingService: BookingService) {}

  ngOnInit(): void {
    this.initializeBookings();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initialize bookings to display on the scheduler.
   */
  private initializeBookings(): void {
    let bookingSubscription = this._bookingService.getBookings().subscribe((data: Booking[]) => {
      this.bookings = data;
    });
    this.subscription.add(bookingSubscription);
  }
}
