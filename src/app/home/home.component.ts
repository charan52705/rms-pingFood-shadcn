import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMenuOpen = false;
  constructor(private router: Router){}
  managementAreas = [
    { title: 'Manage Menu/Items', description: 'View and edit menu items', icon: 'fa-utensils', link: '/admin/menu' },
    { title: 'Manage Users', description: 'Manage system users and roles', icon: 'fa-users', link: '/admin/users' },
    { title: 'Manage Customers', description: 'View and manage customer data', icon: 'fa-user', link: '/admin/customers' },
    { title: 'Manage Branches', description: 'Oversee multiple restaurant locations', icon: 'fa-building', link: '/admin/branches' },
    { title: 'Manage Orders/Inventory', description: 'Track orders and inventory levels', icon: 'fa-shopping-cart', link: '/admin/orders' },
    { title: 'Manage Payments and Orders', description: 'Process and track payments, Orders', icon: 'fa-credit-card', link: '/admin/payments' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  gotoHome() {
    this.router.navigate([''])
  }
}
