import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingComponent } from './features/booking/component/booking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'we-go-jim-app';
}
