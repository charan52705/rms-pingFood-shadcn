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
  cityForm!: FormGroup;
  isSubmitting: boolean = false;
  cities: any[] = [];  // Array to store cities
  activeTab: string = 'create';  // Default active tab
  isMenuOpen: boolean = false;   // Controls the mobile menu visibility

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  // Toggles the menu visibility
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  tabClass(tab: string): string {
    return this.activeTab === tab
      ? 'border-b-2 border-black text-black'
      : 'text-gray-600 hover:text-black';
  }
  initForm(): void {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.minLength(2)]],
      cityState: ['', [Validators.required, Validators.minLength(2)]],
      cityCountry: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.cityForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Simulate a service call to add city
    setTimeout(() => {
      const newCity = this.cityForm.value;
      this.cities.push(newCity);
      this.cityForm.reset();
      this.isSubmitting = false;
      this.setActiveTab('read');
    }, 1000);
  }
}
