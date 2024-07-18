import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../environments/environment';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';
import { API_BOOKINGS_USER } from '../../booking/util/BookingResourcePath';
import { UserBookingHistory } from '../model/user-booking-history';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryApiService {

  constructor(private readonly http: HttpClient) {}
  
  /**
   * Get user's booking histories from the back-end service based on the given userId.
   * @param userId user's id.
   * @returns observable of user's booking histories.
   */
    getUserBookingHistories(userId: string): Observable<UserBookingHistory[]> {
    let apiUrl = ENVIRONMENT.apiUrl + API_BOOKINGS_USER + userId;
    return this.http.get<UserBookingHistory[]>(apiUrl, REQUEST_OPTIONS);
  }
}
