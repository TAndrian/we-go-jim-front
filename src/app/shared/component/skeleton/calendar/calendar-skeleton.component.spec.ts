import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSkeletonComponent } from './calendar-skeleton.component';

describe('CalendarSkeletonComponent', () => {
  let component: CalendarSkeletonComponent;
  let fixture: ComponentFixture<CalendarSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
