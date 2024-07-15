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

  products = [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz'
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
      },
      balance: 70663
    },
    {
      id: 1001,
      name: 'Josephine Darakjy',
      country: {
        name: 'Egypt',
        code: 'eg'
      },
      company: 'Chanay, Jeffrey A Esq',
      date: '2019-02-09',
      status: 'proposal',
      verified: true,
      activity: 0,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png'
      },
      balance: 82429
    }
  ];

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
      });
  }
}
