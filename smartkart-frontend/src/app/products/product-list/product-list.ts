import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true, // makes it standalone
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList {
  products = [
    { name: "Sample Product 1", price: 499 },
    { name: "Sample Product 2", price: 999 }
  ];

  addToCart(product: any) {
    console.log('Added to cart:', product);
    // Add your cart API call here
  }
}
