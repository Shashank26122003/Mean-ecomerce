import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { AdminGuard } from './guards/admin-guard';
import { UserGuard } from './guards/user-guard';
import { ProductsComponent } from './products/products/products';

export const routes: Routes = [
  { path: '', component: Landing },

  // USER SIDE (unchanged)
  { 
    path: 'products', 
    component: ProductsComponent,
    canActivate: [UserGuard]
  },

  // ADMIN DASHBOARD (unchanged)
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },

  // fallback
  { path: '**', redirectTo: '' }
];
