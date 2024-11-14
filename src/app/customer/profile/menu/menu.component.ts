import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuItems = [
    { id: 1, name: 'Cheeseburger', price: 9.99, category: 'Main' },
    { id: 2, name: 'Caesar Salad', price: 7.99, category: 'Starter' },
    { id: 3, name: 'Margherita Pizza', price: 12.99, category: 'Main' },
    { id: 4, name: 'Chocolate Brownie', price: 5.99, category: 'Dessert' }
  ];

}
