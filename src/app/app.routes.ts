import { Routes } from '@angular/router';
import { RegistrationComponent } from './admin/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AddressComponent } from './admin/address/address.component';
import { BranchComponent } from './admin/branch/branch.component';
import { CitiesComponent } from './admin/cities/cities.component';
import { ItemsComponent } from './admin/items/items.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RestaurantComponent } from './admin/restaurant/restaurant.component';
import { UnitsComponent } from './admin/units/units.component';





export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'admin/register', loadComponent: () => import('./admin/registration/registration.component').then(m => m.RegistrationComponent) },
  { path: 'admin/login', loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin/address', loadComponent: () => import('./admin/address/address.component').then(m => m.AddressComponent) },
  { path: 'admin/branch', loadComponent: () => import('./admin/branch/branch.component').then(m => m.BranchComponent) },
  { path: 'admin/cities', loadComponent: () => import('./admin/cities/cities.component').then(m => m.CitiesComponent) },
  { path: 'admin/items', loadComponent: () => import('./admin/items/items.component').then(m => m.ItemsComponent) },
  { path: 'admin/menu', loadComponent: () => import('./admin/menu/menu.component').then(m => m.MenuComponent) },
  { path: 'admin/restaurant', loadComponent: () => import('./admin/restaurant/restaurant.component').then(m => m.RestaurantComponent) },
  { path: 'admin/units', loadComponent: () => import('./admin/units/units.component').then(m => m.UnitsComponent) },
  { path: 'find/food', loadComponent: () => import('./common/find-food/find-food.component').then(m => m.FindFoodComponent) },
  { path: 'find/hotel', loadComponent: () => import('./common/find-hotel/find-hotel.component').then(m => m.FindHotelComponent) }

];