import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { BookingService } from '../service/booking.service';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BookingApiService } from '../service/booking-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockBookingApiService: jasmine.SpyObj<BookingApiService>;

  beforeEach(async () => {
    const spyBookingService = jasmine.createSpyObj('BookingService', ['getBookings']);
    const spyBookingApiService = jasmine.createSpyObj('BookingApiService', ['getBookings']);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BookingService,
          useuseValue: spyBookingService
        },
        {
          provide: BookingApiService,
          useuseValue: spyBookingApiService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    mockBookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    mockBookingApiService = TestBed.inject(BookingApiService) as jasmine.SpyObj<BookingApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize bookings', () => {
    // ARRANGE
    spyOn(mockBookingApiService, 'getBookings').and.returnValue(of(MOCK_BOOKINGS));
    spyOn(mockBookingService, 'getBookings').and.returnValue(of(MOCK_BOOKINGS));

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(component.bookings).toEqual(MOCK_BOOKINGS);
  });
});
