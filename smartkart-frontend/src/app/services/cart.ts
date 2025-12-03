import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { productId, quantity });
  }

  updateCart(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, { productId, quantity });
  }

  removeCartItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove?productId=${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
