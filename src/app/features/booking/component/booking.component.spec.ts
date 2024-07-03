import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { BookingService } from '../service/booking.service';
import { MOCK_BOOKINGS } from '../util/mock/BookingMocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockBookingService: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    const spyBookingService = jasmine.createSpyObj('BookingService', ['getBookings']);

    await TestBed.configureTestingModule({
      imports: [BookingComponent],
      providers: [
        {
          provide: BookingService,
          useuseValue: spyBookingService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    mockBookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
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
    mockBookingService.getBookings.and.returnValue(of(MOCK_BOOKINGS));

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(component.bookings).toEqual(MOCK_BOOKINGS);
  });
});
