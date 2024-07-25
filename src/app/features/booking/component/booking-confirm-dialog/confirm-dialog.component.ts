import { Component, Inject } from '@angular/core';
import { format, isBefore } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DynamicDialogModule, ButtonModule, DialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  messageConfirmation: string = '';
  constructor(
    public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig
  ) {
    this.messageConfirmation =
      format(this.data.start, 'iiii') +
      ' ' +
      format(this.data.start, 'P') +
      ', ' +
      format(this.data.start, 'p') +
      ' - ' +
      format(this.data.end, 'p');
  }

  get data(): any {
    return this.config.data;
  }

  confirm(): void {
    this.ref.close(true);
  }
}
