import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('auth_token'); // match AuthService
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    const roleRequired = route.data['role'];
    const role = this.authService.getRole();
    if (roleRequired && role !== roleRequired) {
      alert('Access denied');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
