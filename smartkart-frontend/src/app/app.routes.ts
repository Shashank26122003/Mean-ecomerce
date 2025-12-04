import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { AdminGuard } from './guards/admin-guard';
import { UserGuard } from './guards/user-guard';
import { ProductsComponent } from './products/products/products';

export const routes: Routes = [
  // ✅ LANDING (LOGIN / REGISTER)
  { path: '', component: Landing },

  // ✅ USER SIDE
  { path: 'products', component: ProductsComponent, canActivate: [UserGuard] },
 // { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
 // { path: 'orders', component: OrdersComponent, canActivate: [UserGuard] },

  // ✅ ADMIN SIDE
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },

  // ✅ FALLBACK
  { path: '**', redirectTo: '' }
];