import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [Navbar, RouterOutlet, CommonModule],
})
export class App {
  // Navbar always visible on all pages including landing
  showNavbar = true;

  constructor() {}
}
