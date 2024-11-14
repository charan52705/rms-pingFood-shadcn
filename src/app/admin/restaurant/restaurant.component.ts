import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  restaurantForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define form structure with validation rules
    this.restaurantForm = this.fb.group({
      restaurantName: ['', [Validators.required, Validators.minLength(3)]],
      restaurantAddress: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?[1-9]{1,4})?(\d{10})$/)]],  // Phone number validation
      cuisineType: ['', [Validators.required, Validators.minLength(2)]],
      openingHours: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.restaurantForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate an API call for adding a restaurant
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Restaurant added:', this.restaurantForm.value);
      // Here you can call the service to save the restaurant details to a backend
    }, 2000);
  }
}
