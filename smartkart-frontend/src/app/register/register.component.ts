// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Register</h2>
    <p>Registration page will be implemented here.</p>
  `,
  styles: [`
    h2 { color: #1e3a8a; }
    p { color: #3b82f6; }
  `]
})
export class RegisterComponent {}
