import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AuthResponse } from '../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing {
  loginForm: FormGroup;
  signupForm: FormGroup;

  loadingLogin = false;
  loadingSignup = false;

  loginError = '';
  signupError = '';

  selectedTabIndex = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // ✅ Auto switch tab from navbar
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'signup') this.selectedTabIndex = 1;
      else this.selectedTabIndex = 0;
    });
  }

  /** LOGIN */
  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loginError = '';
    this.loadingLogin = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const role = this.authService.getRole();
        this.ngZone.run(() => {
          if (role === 'admin') this.router.navigate(['/admin']);
          else this.router.navigate(['/products']);
        });
      },
      error: (err: any) => {
        this.loginError = err.error?.message || 'Login failed';
        this.loadingLogin = false;
        this.cd.detectChanges();
      },
      complete: () => {
        this.loadingLogin = false;
        this.cd.detectChanges();
      },
    });
  }

  /** SIGNUP */
  onSignUp(): void {
    if (this.signupForm.invalid) return;

    this.signupError = '';
    this.loadingSignup = true;

    const { name, email, password } = this.signupForm.value;

    this.authService.signup(name, email, password).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.router.navigate(['/products']);
        });
      },
      error: (err: any) => {
        this.signupError = err.error?.message || 'Signup failed';
        this.loadingSignup = false;
        this.cd.detectChanges();
      },
      complete: () => {
        this.loadingSignup = false;
        this.cd.detectChanges();
      },
    });
  }
}
