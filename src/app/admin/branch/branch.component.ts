import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  branchForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      branchName: ['', [Validators.required, Validators.minLength(2)]],
      branchLocation: ['', [Validators.required, Validators.minLength(3)]],
      branchAddress: ['', [Validators.required, Validators.minLength(5)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]], // Example pattern
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.branchForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    // Simulate API call for adding the branch
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Branch added:', this.branchForm.value);
      // Here you can call the service to save the branch details
    }, 2000);
  }
}
