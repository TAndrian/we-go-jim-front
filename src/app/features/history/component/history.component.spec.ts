import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HistoryService } from '../service/history.service';
import { MOCK_JOHN_BOOKING_HISTORIES } from '../util/history-mock';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService:HistoryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers:[HistoryService, provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    historyService = TestBed.inject(HistoryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should get user's booking histories when given userId", fakeAsync(()=>{
    // ARRANGE
    spyOn(historyService, 'getUserBookingHistories').and.returnValue(of(MOCK_JOHN_BOOKING_HISTORIES))
    tick()

    // ACT
    component.ngOnInit()
    fixture.detectChanges();

    // ASSERT
    expect(component.userBookingHistories).toBe(MOCK_JOHN_BOOKING_HISTORIES)
  }))

    it("should return empty array as user's booking histories when given userId has no booking", fakeAsync(()=>{
    // ARRANGE
    spyOn(historyService, 'getUserBookingHistories').and.returnValue(of([]))
    tick()

    // ACT
    component.ngOnInit()
    fixture.detectChanges();

    // ASSERT
    expect(component.userBookingHistories).toEqual([])
  }))
});
