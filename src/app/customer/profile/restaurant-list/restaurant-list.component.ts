import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent {
  restaurants = [
    { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.5 },
    { id: 2, name: 'Pizza Heaven', cuisine: 'Italian', rating: 4.2 },
    { id: 3, name: 'Sushi World', cuisine: 'Japanese', rating: 4.7 },
  ];

}
