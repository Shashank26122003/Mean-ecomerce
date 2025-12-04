import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ✅ Response interface
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
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((res: AuthResponse) => {
          // ✅ Store token
          localStorage.setItem(this.tokenKey, res.token);

          // ✅ Store role for navbar & guards
          if (res.user?.role) {
            localStorage.setItem('role', res.user.role);
          }
        }),
        catchError(this.handleError)
      );
  }

  // ✅ SIGNUP
  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, { name, email, password })
      .pipe(
        tap((res: AuthResponse) => {
          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);

            if (res.user?.role) {
              localStorage.setItem('role', res.user.role);
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  // ✅ GET TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ GET ROLE
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('role');
  }

  // ✅ ERROR HANDLING
  private handleError(error: HttpErrorResponse) {
    console.error('AuthService error:', error);
    return throwError(() => error);
  }
}
