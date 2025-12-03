import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, // makes it a standalone component
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  regForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the reactive form
    this.regForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.regForm.valid) {
      console.log('Form Data:', this.regForm.value);
      // Call your API here
    } else {
      console.warn('Form is invalid!');
    }
  }
}
