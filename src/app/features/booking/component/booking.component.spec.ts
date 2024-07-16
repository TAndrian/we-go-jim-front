import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookingApiService } from '../service/booking-api.service';
import { BookingService } from '../service/booking.service';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { BookingComponent } from './booking.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockBookingService: jasmine.SpyObj<BookingService>;
  let mockBookingApiService: jasmine.SpyObj<BookingApiService>;

  beforeEach(async () => {
    const spyBookingService = jasmine.createSpyObj(BookingService, [
      'getBookings',
      'getUserBookingHistories'
    ]);
    const spyBookingApiService = jasmine.createSpyObj(BookingApiService, [
      'getBookings',
      'getUserBookingHistories'
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BookingService,
          useValue: spyBookingService
        },
        {
          provide: BookingApiService,
          useValue: spyBookingApiService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    mockBookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    mockBookingApiService = TestBed.inject(BookingApiService) as jasmine.SpyObj<BookingApiService>;

    // ARRANGE
    mockBookingService.getBookings.and.returnValue(of(MOCK_BOOKINGS));
    mockBookingApiService.getBookings.and.returnValue(of(MOCK_BOOKINGS));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize bookings and user's booking histories", () => {
    // ACT
    component.ngOnInit();
    fixture.detectChanges();

    // ASSERT
    expect(component.bookings).toEqual(MOCK_BOOKINGS);
  });
});
