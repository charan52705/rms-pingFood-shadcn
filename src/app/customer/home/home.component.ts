import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  featuredDishes = [
    { name: "Truffle Risotto", description: "Creamy Arborio rice with black truffle and Parmesan" },
    { name: "Seared Scallops", description: "Pan-seared scallops with cauliflower purée and bacon crumbs" },
    { name: "Wagyu Steak", description: "A5 Wagyu beef with roasted vegetables and red wine jus" }
  ];

  submitForm(form: any) {
    if (form.valid) {
      console.log('Form submitted', form.value);
      // Here you would typically send the form data to a server
    }
  }

  subscribeNewsletter(email: string) {
    console.log('Subscribing email:', email);
    // Here you would typically send the email to a server for newsletter subscription
  }

}
