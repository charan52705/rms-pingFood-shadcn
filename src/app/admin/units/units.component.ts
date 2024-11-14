import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-units',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css'
})
export class UnitsComponent {
  unitForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define form structure with validation rules
    this.unitForm = this.fb.group({
      unitName: ['', [Validators.required, Validators.minLength(3)]],
      unitAbbreviation: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,5}$/)]],  // Unit abbreviation validation
      associatedState: ['', [Validators.required, Validators.minLength(3)]],  // Optional association
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.unitForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate an API call for adding a unit
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Unit added:', this.unitForm.value);
      // Here you can call a service to save the unit details to a backend
    }, 2000);
  }
}
