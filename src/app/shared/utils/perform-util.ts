import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
/**
 * Find out why the isLoading is always true
 */
export class PerformUtil<T> {
  data: T | undefined;
  isLoading!: boolean;
  hasError!: boolean;
  private action$!: Observable<T>;
  subject!: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.subject = new BehaviorSubject(initialValue);
  }

  load(action$: Observable<T>): void {
    this.isLoading = true; // shit happens here
    this.hasError = false;
    this.action$ = action$;
    this.action$
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading = true;
          console.log(error);
          console.log('in catchError', this.isLoading);
          return [];
        })
      )
      .subscribe((data: T) => {
        this.subject.next(data);
        this.isLoading = false;
        this.hasError = false;
        console.log('in subscribe', this.isLoading);
      });
  }
}
