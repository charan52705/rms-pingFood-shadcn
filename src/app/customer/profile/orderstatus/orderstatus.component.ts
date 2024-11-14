import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderstatus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './orderstatus.component.html',
  styleUrl: './orderstatus.component.css'
})
export class OrderstatusComponent {
  orders = [
    { id: '1234', restaurant: 'Burger Palace', status: 'In Progress', items: ['Cheeseburger', 'Fries'] },
    { id: '5678', restaurant: 'Pizza Heaven', status: 'Delivered', items: ['Pepperoni Pizza', 'Garlic Bread'] },
    { id: '9012', restaurant: 'Sushi World', status: 'Preparing', items: ['California Roll', 'Miso Soup'] }
  ];

}
