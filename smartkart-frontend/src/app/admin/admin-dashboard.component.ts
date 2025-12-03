// src/app/admin/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Welcome, Admin!</h2>
    <p>Manage products, orders, and users here.</p>
  `,
  styles: [`
    h2 { color: #1e3a8a; } /* Indigo */
    p { color: #3b82f6; }  /* Blue */
  `]
})
export class AdminDashboardComponent {}
