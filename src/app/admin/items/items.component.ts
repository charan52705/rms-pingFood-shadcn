import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  itemForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define form structure with validation rules
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
      itemDescription: ['', [Validators.required, Validators.minLength(10)]],
      itemPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],  // Price with two decimal points
      itemCategory: ['', [Validators.required, Validators.minLength(2)]],
      itemQuantity: ['', [Validators.required, Validators.min(1)]],  // Must be a positive number
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.itemForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate an API call for adding an item
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Item added:', this.itemForm.value);
      // Here you can call the service to save the item details to a backend
    }, 2000);
  }
}
