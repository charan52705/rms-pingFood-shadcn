import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { MenuComponent } from './menu/menu.component';
import { TablebookingComponent } from './tablebooking/tablebooking.component';
import { OnlineorderComponent } from './onlineorder/onlineorder.component';
import { PaymentComponent } from './payment/payment.component';
interface Order {
  id: string;
  status: string;
  estimatedDelivery: string;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isMobileSidebarOpen = false;
  activeComponent: any = OrderstatusComponent;
  isLoggedIn: boolean = false; 
  user: { name: string, avatar: string } | null = null; 
  Name:string = 'Divya'

  navItems = [
   
    
    { icon: 'fa-solid fa-list-check', label: 'Order Status', component: OrderstatusComponent },
    { icon: 'fa-solid fa-utensils', label: 'Restaurants', component: RestaurantListComponent },
    { icon: 'fa-solid fa-book-open', label: 'Menu', component: MenuComponent },
    { icon: 'fa-solid fa-calendar-plus', label: 'Book Table', component: TablebookingComponent
     },
    { icon: 'fa-solid fa-cart-shopping', label: 'Order Online', component: OnlineorderComponent },
    { icon: 'fa-solid fa-credit-card', label: 'Payment', component: PaymentComponent },
  ];
  login() {
    
    console.log('Redirecting to login...');
    this.isLoggedIn = true; 
    this.user = {
      name: 'John Doe',
      avatar: 'https:'
    };
  }
  setActiveComponent(component: any) {
    this.activeComponent = component;
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }
  closeMobileSidebar() {
    this.isMobileSidebarOpen = false; 
  }
  isUserSettingsMenuOpen = false; 

  
  toggleUserSettingsMenu() {
    this.isUserSettingsMenuOpen = !this.isUserSettingsMenuOpen;
  }

  
  openUserSettings() {
    this.toggleUserSettingsMenu()
    
    console.log('User Settings clicked');
  }

  openProfile() {
    this.toggleUserSettingsMenu()
    
    console.log('Profile clicked');
  }
  logout() {
    this.toggleUserSettingsMenu()
    console.log('Logout clicked');
  }
}
