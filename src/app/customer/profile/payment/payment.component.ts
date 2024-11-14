import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  paymentMethod: string = 'credit';
  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';

  handleSubmit(): void {
    // Handle the payment logic here
    console.log('Payment submitted:', { paymentMethod: this.paymentMethod, cardNumber: this.cardNumber, expiry: this.expiry, cvv: this.cvv });
  }

}
