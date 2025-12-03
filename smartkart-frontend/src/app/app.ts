import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports : [Navbar,RouterOutlet],
})
export class App {
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide navbar on landing page
      this.showNavbar = event.urlAfterRedirects === '/' ? false : true;
    });
  }
}
