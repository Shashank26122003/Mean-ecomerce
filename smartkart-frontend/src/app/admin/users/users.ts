import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,               // ✅ Make it standalone
  imports: [CommonModule, HttpClientModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="users" class="mat-elevation-z8" *ngIf="users.length > 0">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let user">{{ user.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let user">{{ user.email }}</td>
      </ng-container>

      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef>Role</th>
        <td mat-cell *matCellDef="let user">{{ user.role }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let user">
          <button mat-button color="warn" (click)="deleteUser(user._id)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>

    <p *ngIf="users.length === 0">No users found.</p>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  columns = ['name', 'email', 'role', 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:5000/api/users')
      .subscribe({
        next: data => this.users = data,
        error: err => console.error('Error fetching users', err)
      });
  }

  deleteUser(id: string) {
    if (!confirm('Are you sure?')) return;
    this.http.delete(`http://localhost:5000/api/users/${id}`)
      .subscribe(() => this.getUsers());
  }
}
