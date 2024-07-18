import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { HistorySkeletonComponent } from '../../../shared/skeleton/history/history-skeleton.component';
import { UserBookingHistory } from '../model/user-booking-history';
import { HistoryService } from '../service/history.service';
import { TABLE_HEADER } from '../util/history-table-util';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TableModule, CommonModule, HistorySkeletonComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor(private readonly _historyService: HistoryService) {}

  ROWS: number = 5;
  PAGINATOR: Array<number> = [5, 10, 20];
  tableHeader = TABLE_HEADER;
  isLoading!: boolean;
  userBookingHistories: UserBookingHistory[] = [];
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initializeBookingHistory();
  }

  /**
   * Initialize user's booking histories.
   */
  private initializeBookingHistory(): void {
    this.subscription = this._historyService
      .getUserBookingHistories('8cfef374-700d-4d57-8fe8-688b976458e4')
      .subscribe((data: UserBookingHistory[]) => {
        this.userBookingHistories = data;
        this.isLoading = this._historyService.isLoading;
      });
  }
}
