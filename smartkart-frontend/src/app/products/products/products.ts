import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: string[]; // optional array of image URLs
  category?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.error = '';

    this.http.get<Product[]>('http://localhost:5000/api/products').subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. ' + (err.error?.message || '');
        this.loading = false;
      },
    });
  }

  // Optional helper: get main image or placeholder
  getMainImage(product: Product): string {
    return product.images && product.images.length
      ? product.images[0]
      : 'assets/placeholder.png'; // fallback image
  }
}
