import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// ✅ Make sure this interface is exported
export interface AuthResponse {
  token: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private baseUrl = 'http://localhost:5000/api/auth'; // backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.token) this.setToken(res.token);
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, { name, email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.token) this.setToken(res.token);
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
