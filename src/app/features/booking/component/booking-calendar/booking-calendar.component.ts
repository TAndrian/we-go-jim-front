import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSpanApi, EventClickArg } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { add, addMinutes, isBefore } from 'date-fns';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Booking } from '../../model/booking';
import { BookingEvents } from '../../model/booking-events';
import {
  AVAILABLE_SLOT_STYLE,
  DATE_FORMAT,
  EXPIRED_SLOT_STYLE,
  MAX_PARTICIPANT,
  UNAVAILABLE_SLOT_STYLE
} from '../../util/booking-calendar-variables';
import { ConfirmDialogComponent } from '../booking-confirm-dialog/confirm-dialog.component';
import { BookingEventDialogComponent } from '../booking-event-dialog/booking-event-dialog.component';
import { Subscription } from 'rxjs';
import { BookingService } from '../../service/booking.service';

const newEvent: BookingEvents = {
  title: 'Test',
  start: '2024-07-25 12:00',
  end: '2024-07-25 12:30'
};

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [FullCalendarModule, ConfirmDialogComponent, BookingEventDialogComponent],
  providers: [DatePipe, DialogService],
  templateUrl: './booking-calendar.component.html',
  styleUrl: './booking-calendar.component.scss'
})
export class BookingCalendarComponent {
  constructor(
    private datePipe: DatePipe,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService,
    private readonly _bookingService: BookingService
  ) {}

  subscription: Subscription = new Subscription();

  ref: DynamicDialogRef | undefined;

  bookings: Booking[] = [];

  // references the #calendar in the template
  @ViewChild('calendar')
  calendarComponent: FullCalendarComponent = new FullCalendarComponent(
    this.elementRef,
    this.changeDetectorRef
  );

  calendarOptions: CalendarOptions = {
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
    events: [],
    displayEventTime: false,
    slotLabelContent: (arg) => this.customSlotLabel(arg.date),
    selectAllow: (arg) => this.handleMultiSelectEvent(arg),
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClicked(arg)
  };

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
      this.calendarOptions.events = data.map((booking: Booking) => this.mapBookingToEvent(booking));
    });
    this.subscription.add(bookingSubscription);
  }

  /**
   * Extract events from bookings.
   * @param booking Bookings.
   * @returns Events.
   */
  mapBookingToEvent(booking: Booking): BookingEvents {
    return {
      id: booking.id,
      title: `Participants: ${booking.maxParticipant}`,
      start: booking.startTime,
      end: booking.endTime,
      backgroundColor: this.getEventBackgroundColor(booking)
    };
  }

  /**
   * Get the event background color corresponding to the booking properties.
   * @param booking booking.
   * @returns Appropriate background color according to the booking properties.
   */
  private getEventBackgroundColor(booking: Booking): string {
    if (this.isPastToday(booking.startTime)) {
      return EXPIRED_SLOT_STYLE;
    } else if (this.isTimeSlotAvailable(booking.maxParticipant)) {
      return AVAILABLE_SLOT_STYLE;
    } else {
      return UNAVAILABLE_SLOT_STYLE;
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
   * Check if start date is past today.
   * @param startDate start date.
   * @returns true if the start date is past today.
   */
  private isPastToday(startDate: Date): boolean {
    return isBefore(startDate, new Date());
  }

  /**
   * Handle dateClicked from calendar.
   */
  private handleDateClick(arg: DateClickArg): void {
    const clickedDate = new Date(arg.date);

    const now = new Date();

    if (isBefore(clickedDate, now)) {
      alert('Selected date is in the past and cannot be selected.');
    } else {
      let start = clickedDate;
      let end = addMinutes(start, 30);
      this.showConfirmDialog(start, end);
    }
  }

  /**
   * Show confirm dialog when date is clicked.
   * @param dateStr Date clicked on calendar.
   */
  private showConfirmDialog(start: Date, end: Date): void {
    this.ref = this.dialogService.open(ConfirmDialogComponent, {
      header: 'Confirm schedule booking',
      width: '500px',
      data: {
        start: this.datePipe.transform(start, DATE_FORMAT),
        end: this.datePipe.transform(end, DATE_FORMAT)
      }
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Handle event creation logic here
        alert('Event will be created on: ' + start + ' - ' + end);
      }
    });
  }

  /**
   * Open dialog on clicked event.
   * @param arg EventClickArg.
   */
  private handleEventClicked(arg: EventClickArg): void {
    const event = arg.event;
    this.showEventDialog(event);
  }

  /**
   * Display event details inside dialog.
   * @param event  event clicked.
   */
  private showEventDialog(event: EventImpl): void {
    this.ref = this.dialogService.open(BookingEventDialogComponent, {
      header: 'Event Details',
      width: '500px',
      data: {
        title: event.title,
        start: this.datePipe.transform(event.start, DATE_FORMAT),
        end: this.datePipe.transform(event.end, DATE_FORMAT)
      }
    });
  }

  /**
   * Disable multiple selection and allow only one selection per cells.
   * @param event mouse select event.
   * @returns blocked multiple selection if the user has selected multiple cells.
   */
  private handleMultiSelectEvent(arg: DateSpanApi): boolean {
    const startDate = new Date(arg.start);
    const endDate = new Date(arg.end);

    endDate.setSeconds(endDate.getSeconds() - 1);

    const formattedStartDate = this.datePipe.transform(startDate);
    const formattedEndDate = this.datePipe.transform(endDate);

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
   * Custom label for time slots.
   * @param date dates.
   * @returns custom slot label in {start - end PM} format for time slots.
   */
  customSlotLabel(date: Date): { html: string } {
    const start = date;

    // Add 30 min to endTime
    const end = new Date(date.getTime() + 30 * 60000);

    const startTime = this.datePipe.transform(start, 'h:mm');
    const endTime = this.datePipe.transform(end, 'h:mm a');

    return {
      html: `${startTime} - ${endTime}`
    };
  }
}
