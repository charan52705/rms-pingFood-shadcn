import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onlineorder',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './onlineorder.component.html',
  styleUrl: './onlineorder.component.css'
})
export class OnlineorderComponent {
  menuItems = [
    { id: 1, name: 'Cheeseburger', price: 9.99 },
    { id: 2, name: 'Caesar Salad', price: 7.99 },
    { id: 3, name: 'Margherita Pizza', price: 12.99 },
    { id: 4, name: 'Chocolate Brownie', price: 5.99 }
  ];

  order: { [key: number]: number } = {};

  addToOrder(itemId: number): void {
    this.order[itemId] = (this.order[itemId] || 0) + 1;
  }

  removeFromOrder(itemId: number): void {
    if (this.order[itemId] > 1) {
      this.order[itemId]--;
    } else {
      delete this.order[itemId];
    }
  }

  get total(): number {
    return Object.entries(this.order).reduce((sum, [itemId, quantity]) => {
      const item = this.menuItems.find(i => i.id === parseInt(itemId));
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  }

  placeOrder(): void {
    // Handle the order submission logic
    console.log('Order placed:', this.order);
  }

}
