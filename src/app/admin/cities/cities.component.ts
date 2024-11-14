import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
  cityForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define form structure with validation rules
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.minLength(2)]],
      cityState: ['', [Validators.required, Validators.minLength(2)]],
      cityCountry: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]], // Postal code pattern
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.cityForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate an API call for adding a city
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('City added:', this.cityForm.value);
      // Here you can call the service to save the city details to a backend
    }, 2000);
  }
}
