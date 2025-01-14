import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';  
import { CustomerGuard } from './guards/customer.guard';  
import { ProfileComponent } from './customer/profile/profile.component';

export const routes: Routes = [
  
  { path: '', loadComponent: () => import('./customer/home/home.component').then(m => m.HomeComponent) },
  { path: 'common/login', loadComponent: () => import('./common/login/login.component').then(m => m.LoginComponent) },
  { path: 'common/register', loadComponent: () => import('./common/register/register.component').then(m => m.RegisterComponent) },

  { path: 'customer/register', loadComponent: () => import('./customer/register/register.component').then(m => m.RegisterComponent) },
  { path: 'customer/home', loadComponent: () => import('./customer/home/home.component').then(m => m.HomeComponent), canActivate: [CustomerGuard] },
  
  
  { path: 'profile', component: ProfileComponent, canActivate: [CustomerGuard] }, 
  
  
  { path: 'admin/home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), canActivate: [AdminGuard] },
  { path: 'admin/register', loadComponent: () => import('./admin/registration/registration.component').then(m => m.RegistrationComponent) },
  { path: 'admin/address', loadComponent: () => import('./admin/address/address.component').then(m => m.AddressComponent), canActivate: [AdminGuard] },
  { path: 'admin/branches', loadComponent: () => import('./admin/branch/branch.component').then(m => m.BranchComponent), canActivate: [AdminGuard] },
  { path: 'admin/cities', loadComponent: () => import('./admin/cities/cities.component').then(m => m.CitiesComponent), canActivate: [AdminGuard] },
  { path: 'admin/items', loadComponent: () => import('./admin/items/items.component').then(m => m.ItemsComponent), canActivate: [AdminGuard] },
  { path: 'admin/menu', loadComponent: () => import('./admin/menu/menu.component').then(m => m.MenuComponent), canActivate: [AdminGuard] },
  { path: 'admin/units', loadComponent: () => import('./admin/units/units.component').then(m => m.UnitsComponent), canActivate: [AdminGuard] },
  { path: 'admin/users', loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent), canActivate: [AdminGuard] },
  { path: 'admin/customers', loadComponent: () => import('./admin/customers/customers.component').then(m => m.CustomersComponent), canActivate: [AdminGuard] },
  { path: 'admin/orders', loadComponent: () => import('./admin/orders/orders.component').then(m => m.OrdersComponent), canActivate: [AdminGuard] },
  { path: 'admin/payments', loadComponent: () => import('./admin/track-orders/track-orders.component').then(m => m.TrackOrdersComponent), canActivate: [AdminGuard] },

  
  { path: 'find/food', loadComponent: () => import('./common/find-food/find-food.component').then(m => m.FindFoodComponent) },
  { path: 'find/hotel', loadComponent: () => import('./common/find-hotel/find-hotel.component').then(m => m.FindHotelComponent) },
];
