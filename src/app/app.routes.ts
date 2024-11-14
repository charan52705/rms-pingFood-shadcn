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
    {path:'', component:HomeComponent},
    {path:'auth/register', component: RegistrationComponent  },
    {path:'auth/login', component:LoginComponent},
    {path:'address', component:AddressComponent},
    {path: 'branch', component:BranchComponent},
    {path: 'cities', component: CitiesComponent},
    {path:'items', component:ItemsComponent}, 
    {path:'menu', component:MenuComponent}, 
    {path: 'restaurant', component: RestaurantComponent},
    {path:'units', component:UnitsComponent}
];
