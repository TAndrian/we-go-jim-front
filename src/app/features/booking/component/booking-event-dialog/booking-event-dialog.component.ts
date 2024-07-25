import { Component, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingEvents } from '../../model/booking-events';
import { ButtonModule } from 'primeng/button';
import { isBefore } from 'date-fns';

@Component({
  selector: 'app-booking-event-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './booking-event-dialog.component.html',
  styleUrl: './booking-event-dialog.component.scss'
})
export class BookingEventDialogComponent {
  event: BookingEvents;

  constructor(
    public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig
  ) {
    this.event = this.data;
  }

  get data() {
    return this.config.data;
  }

  /**
   * Close dialog.
   */
  onClose(): void {
    this.ref.close();
  }

  /**
   * check and disable confirm button if the slot is past today.
   * @returns true if the slot is past today.
   */
  isPastToday(): boolean {
    return isBefore(this.event.start, new Date());
  }

  /**
   * Handle slot reservation request.
   */
  handleSlotReservationRequest(): void {
    this.ref.close();
  }
}
