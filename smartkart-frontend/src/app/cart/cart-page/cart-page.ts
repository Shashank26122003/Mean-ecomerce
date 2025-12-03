import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; // ← ADD THIS

@Component({
  selector: 'app-cart-page',
  standalone: true,                      // ← make it standalone
  imports: [MatCardModule, MatButtonModule, MatTableModule], // ← add MatTableModule
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css'],
})
export class CartPage {
  cols = ['name', 'qty'];
  cart = [
    { name: 'Sample Product 1', quantity: 2 },
    { name: 'Sample Product 2', quantity: 1 },
  ];
}
