import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TABLE_HEADER } from '../util/history-table-util';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserBookingHistory } from '../model/user-booking-history';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  ROWS: number = 5;
  PAGINATOR: Array<number> = [5, 10, 20];
  tableHeader = TABLE_HEADER;

  userBookingHistories: UserBookingHistory[] = [];
  subscription: Subscription = new Subscription();

  constructor(private readonly _historyService: HistoryService) {}

  ngOnInit(): void {
    this.initializeBookingHistory();
  }

  /**
   * Initialize user's booking histories.
   */
  private initializeBookingHistory(): void {
    this.subscription = this._historyService
      .getUserBookingHistories('8eb67a46-a334-47ec-84d9-e3277c60d3b1')
      .subscribe((data: UserBookingHistory[]) => {
        this.userBookingHistories = data;
      });
  }
}
