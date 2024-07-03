import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { API_BOOKINGS } from '../util/BookingResourcePath';
import { REQUEST_OPTIONS } from '../../../shared/utils/HttpHeaders';
import { ENVIRONMENT } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  private apiUrl: string = ENVIRONMENT.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    this.apiUrl = this.apiUrl + API_BOOKINGS;
    return this.http.get<Booking[]>(this.apiUrl, REQUEST_OPTIONS);
  }
}
