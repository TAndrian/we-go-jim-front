import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Subscription } from 'rxjs';
import { Booking } from '../model/booking';
import { BookingService } from '../service/booking.service';

import { DatePipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import { isBefore } from 'date-fns';
import { BookingEvents } from '../model/booking-events';

const DATE_FORMAT: string = 'YYYY-MM-ddTHH:mm';
const MAX_PARTICIPANT: number = 10;
const AVAILABLE_SLOT_STYLE: string = '#008000';
const UNAVAILABLE_SLOT_STYLE: string = '#8B0000';
const EXPIRED_SLOT_STYLE: string = '#4B4B4B';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FullCalendarModule],
  providers: [DatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  private _bookingEvents: BookingEvents[] = [];
  private _isSlotAvailable: boolean = false;

  bookings: Booking[] = [];
  subscription: Subscription = new Subscription();
  calendarOptions!: CalendarOptions;

  constructor(
    private readonly _bookingService: BookingService,
    private readonly _datePipe: DatePipe
  ) {}

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
      this._bookingEvents = this.getBookingEvents(data);
      this.setUpCalendarOptions();
    });
    this.subscription.add(bookingSubscription);
  }

  /**
   * Get all events from given bookings.
   * @param bookings given bookings.
   * @returns Events from given bookings.
   */
  private getBookingEvents(bookings: Booking[]): BookingEvents[] {
    return bookings.map((booking) => ({
      title: 'Paticipant: ' + booking.maxParticipant,
      start: booking.startTime,
      end: booking.endTime,
      backgroundColor: this.getEventBackgroundColor(booking)
    }));
  }

  /**
   * Get the event background color corresponding to the booking properties.
   * @param booking booking.
   * @returns Appropriate background color according to the booking properties.
   */
  private getEventBackgroundColor(booking: Booking): string {
    if (this.isPastToday(booking.startTime)) {
      return EXPIRED_SLOT_STYLE;
    } else {
      return this.isTimeSlotAvailable(booking.maxParticipant)
        ? AVAILABLE_SLOT_STYLE
        : UNAVAILABLE_SLOT_STYLE;
    }
  }

  /**
   * Check if the time slot is available i.e. there is less or equal than 10 participants
   * on the selected time slot.
   * @param participant number of all participants.
   * @returns true if the time slot is available.
   */
  private isTimeSlotAvailable(participant: number): boolean {
    return participant < MAX_PARTICIPANT;
  }

  /**
   * Calendar configuraitons
   */
  private setUpCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      weekends: false,
      initialView: 'timeGridWeek',
      slotMinTime: '08:00:00',
      slotMaxTime: '19:30:00',
      slotDuration: '00:30:00',
      slotLabelInterval: '01:00:00',
      allDaySlot: false,
      slotLabelFormat: [
        { hour: '2-digit', minute: '2-digit', meridiem: 'short', omitZeroMinute: false }
      ],
      height: 'auto',
      expandRows: false,
      editable: true,
      selectable: true,
      eventDurationEditable: false,
      events: this._bookingEvents,
      eventBorderColor: 'black',
      displayEventTime: false,
      eventClick: (event) => this.handleEventClick(event),
      select: (event) => this.handleSelectedEventClick(event),
      selectAllow: (event) => this.handleMultiSelectEvent(event),
      slotLabelContent: (args) => this.customSlotLabel(args.date)
    };
  }

  /**
   * Handle clicked event.
   * @param event event.
   */
  private handleEventClick(event: any) {
    const startTime = event.event.start;
    const endTime = event.event.end;

    console.log(`Start Time: ${startTime}`);
    console.log(`End Time: ${endTime}`);
  }

  /**
   * Handle user's clicked event selection.
   * @param event event selected.
   */
  private handleSelectedEventClick(event: any) {
    const start = this._datePipe.transform(event.start, DATE_FORMAT);
    const end = this._datePipe.transform(event.end, DATE_FORMAT);
    console.log({ start }, { end });
  }

  /**
   * Disable multiple selection and allow only one selection per cells.
   * @param event mouse select event.
   * @returns blocked multiple selection if the user has selected multiple cells.
   */
  private handleMultiSelectEvent(event: any): boolean {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    endDate.setSeconds(endDate.getSeconds() - 1);

    const formattedStartDate = this._datePipe.transform(startDate);
    const formattedEndDate = this._datePipe.transform(endDate);

    const isSameDay = formattedStartDate === formattedEndDate;

    const isSameTimeSlot = this.isSameTimeSlot(startDate, endDate);

    const isPastToday = this.isPastToday(startDate);

    return isSameDay && isSameTimeSlot && !isPastToday;
  }

  /**
   * Check if the startTime and endTime are in the same slot of 30 minutes.
   * @param startDate startTime.
   * @param endDate endTime.
   * @returns true if the time inteval of startTime and endTime is 30 minutes.
   */
  private isSameTimeSlot(startDate: Date, endDate: Date): boolean {
    // 30 minutes in milliseconds
    const interval = 30 * 60 * 1000;

    const duration = endDate.getTime() - startDate.getTime();
    return duration <= interval;
  }

  /**
   * Check if start date is past today.
   * @param startDate start date.
   * @returns true if the start date is past today.
   */
  private isPastToday(startDate: Date): boolean {
    return isBefore(startDate, new Date());
  }

  /**
   * Custom label for time slots.
   * @param date dates.
   * @returns custom slot label in {start - end PM} format for time slots.
   */
  customSlotLabel(date: Date): { html: string } {
    const start = date;

    // Add 30 min to endTime
    const end = new Date(date.getTime() + 30 * 60000);

    const startTime = this._datePipe.transform(start, 'h:mm');
    const endTime = this._datePipe.transform(end, 'h:mm a');

    return {
      html: `${startTime} - ${endTime}`
    };
  }
}
