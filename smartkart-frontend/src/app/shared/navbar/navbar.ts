import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],   // ✅ RouterModule is REQUIRED
  templateUrl: './navbar.html'
})
export class Navbar {
  constructor(public router: Router, public auth: AuthService) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);   // ✅ redirect to landing
  }

  goHome() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    } else if (this.auth.getRole() === 'user') {
      this.router.navigate(['/products']);
    } else if (this.auth.getRole() === 'admin') {
      this.router.navigate(['/admin']);
    }
  }
}
