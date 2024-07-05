import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { API_BOOKINGS, API_BOOKINGS_USER } from '../util/BookingResourcePath';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';
import { ENVIRONMENT } from '../../../environments/environment';
import { UserBookingHistory } from '../model/UserBookingHistory';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  constructor(private readonly http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    let apiUrl = ENVIRONMENT.apiUrl + API_BOOKINGS;
    return this.http.get<Booking[]>(apiUrl, REQUEST_OPTIONS);
  }

  getUserBookingHistories(userId: string): Observable<UserBookingHistory[]> {
    let apiUrl = ENVIRONMENT.apiUrl + API_BOOKINGS_USER + userId;
    return this.http.get<UserBookingHistory[]>(apiUrl, REQUEST_OPTIONS);
  }
}
