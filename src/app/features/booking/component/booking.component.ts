import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../user/model/User';
import { UserService } from '../../user/service/user.service';
import { Booking } from '../model/booking';
import { BookingService } from '../service/booking.service';

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

  constructor(
    private readonly _bookingService: BookingService,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeBookings();
    this.getUserById();
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



  private getUserById(): void {
    this.subscription = this._userService
      .getUserById('8cfef374-700d-4d57-8fe8-688b976458e4')
      .subscribe((user: User) => {
      });
  }
}
