import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../environments/environment';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';
import { Booking } from '../model/booking';
import { API_BOOKINGS } from '../util/BookingResourcePath';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get bookings from back-end service.
   * @returns observable of bookings.
   */
  getBookings(): Observable<Booking[]> {
    let apiUrl = ENVIRONMENT.apiUrl + API_BOOKINGS;
    return this.http.get<Booking[]>(apiUrl, REQUEST_OPTIONS);
  }
}
