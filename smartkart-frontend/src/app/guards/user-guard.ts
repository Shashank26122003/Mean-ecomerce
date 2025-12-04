import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    const role = this.auth.getRole();
    if (role === 'user') return true;

    this.router.navigate(['/admin']);
    return false;
  }
}
