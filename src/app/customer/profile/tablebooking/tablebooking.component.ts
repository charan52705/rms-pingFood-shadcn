import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablebooking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tablebooking.component.html',
  styleUrl: './tablebooking.component.css'
})
export class TablebookingComponent {

  date: string = '';
  time: string = '';
  guests: string = '';
  
  guestOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  handleSubmit(): void {
    // Handle booking logic here
    console.log('Booking submitted:', { date: this.date, time: this.time, guests: this.guests });
  }

}
