import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersComponent } from '../users/users';
import { ProductsComponent } from '../products/products';
import { Orders } from '../orders/orders';   // ✅ ADD THIS

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    UsersComponent,
    ProductsComponent,
    Orders        // ✅ ADD THIS
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent {
  selectedSection: string = 'products';

  sections = [
    { key: 'products', label: 'Manage Products', icon: 'inventory_2' },
    { key: 'orders', label: 'View Orders', icon: 'shopping_cart' },
    { key: 'users', label: 'Manage Users', icon: 'people' },
  ];

  selectSection(sectionKey: string) {
    this.selectedSection = sectionKey;
  }
}
