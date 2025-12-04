import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  importProducts() {
    this.productService.importProducts().subscribe(() => {
      this.loadProducts();
    });
  }
}
