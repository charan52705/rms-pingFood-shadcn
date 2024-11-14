import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define form structure with validation rules
    this.menuForm = this.fb.group({
      menuName: ['', [Validators.required, Validators.minLength(2)]],
      menuDescription: ['', [Validators.required, Validators.minLength(10)]],
      menuPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],  // Price with two decimal points
      menuCategory: ['', [Validators.required, Validators.minLength(2)]],
      menuQuantity: ['', [Validators.required, Validators.min(1)]],  // Must be a positive number
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.menuForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate an API call for adding a menu item
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Menu item added:', this.menuForm.value);
      // Here you can call the service to save the menu item details to a backend
    }, 2000);
  }
}
