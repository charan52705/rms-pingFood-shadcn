import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMenuOpen = false;
  features = [
    { icon: 'fas fa-clipboard-list', title: 'Inventory Management', description: 'Keep track of your stock levels and automate reordering processes.' },
    { icon: 'fas fa-users', title: 'Staff Scheduling', description: 'Efficiently manage employee shifts and reduce scheduling conflicts.' },
    { icon: 'fas fa-dollar-sign', title: 'Financial Reporting', description: 'Generate detailed financial reports to make informed business decisions.' },
    { icon: 'fas fa-hat-chef', title: 'Menu Planning', description: 'Create and optimize menus based on popularity and profitability.' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
