import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ✅ Exported interface for type safety
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

  // Use proxy in development or full backend URL
  private baseUrl = 'http://localhost:5000/api/auth'; // Update to match backend prefix

  constructor(private http: HttpClient) {}

  /** Login user */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.token) this.setToken(res.token);
      }),
      catchError(this.handleError)
    );
  }

  /** Signup user */
  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, { name, email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.token) this.setToken(res.token);
      }),
      catchError(this.handleError)
    );
  }

  /** Store JWT token in localStorage */
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  /** Get JWT token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** Get user role from token */
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

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /** Handle HTTP errors */
  private handleError(error: HttpErrorResponse) {
    console.error('AuthService error:', error);
    return throwError(() => error);
  }
}
