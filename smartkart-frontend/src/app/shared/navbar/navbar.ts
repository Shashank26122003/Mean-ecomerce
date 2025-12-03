import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, // ✅ Required for *ngIf, *ngFor, etc.
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  role = signal<'admin' | 'user' | null>(null); // track user role

  isAdmin() {
    return this.role() === 'admin';
  }

  isUser() {
    return this.role() === 'user';
  }

  isLoggedIn() {
    return this.role() !== null;
  }
}
