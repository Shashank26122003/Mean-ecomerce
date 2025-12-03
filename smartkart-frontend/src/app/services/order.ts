import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.baseUrl, orderData);
  }

  getOrders(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
