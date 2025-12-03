import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-list',
  standalone: true,                     // ← make it standalone
  imports: [MatCardModule, FormsModule, CommonModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],      // ← correct property name
})
export class OrderList {
  // Add the 'orders' property to avoid template error
  orders = [
    { _id: 'ORD001', total: 1200 },
    { _id: 'ORD002', total: 550 },
  ];
}
