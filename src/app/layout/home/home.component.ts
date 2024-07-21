import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../shared/component/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
