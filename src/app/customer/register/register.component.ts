import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialize the form with validations
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  // Name validation
      email: ['', [Validators.required, Validators.email]],       // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password validation
      confirmPassword: ['', [Validators.required]]                // Confirm Password validation
    }, {
      // Custom validation to check if passwords match
      validators: this.passwordsMatchValidator
    });
  }

  // Custom Validator to check if password and confirmPassword match
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }

  // Submit the form
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registration Data:', formData);

      // Here you would typically send the form data to your backend for registration
      // this.authService.register(formData).subscribe(...);

      // After successful registration, you can redirect to the login page or another route
      this.router.navigate(['/customer/login']);
    }
  }

}
