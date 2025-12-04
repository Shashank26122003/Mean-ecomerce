import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const role = this.auth.getRole();

    // ✅ ADMIN → auto import then fetch
    if (role === 'admin') {
      this.productService.importProducts().subscribe({
        next: () => this.loadProducts(),
        error: () => this.loadProducts()
      });
    }
    // ✅ USER → only fetch
    else {
      this.loadProducts();
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: err => {
        console.error('Product load failed:', err);
        this.loading = false;
      }
    });
  }
}
