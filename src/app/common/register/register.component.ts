import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      userType: ['customer', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator for password strength
  passwordStrengthValidator(control:any) {
    const value = control.value;
    if (!value) return null;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const isValid = hasNumber.test(value) && hasSpecialChar.test(value);
    return isValid ? null : { 'weakPassword': true };
  }

  // Custom validator to ensure passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { 'mismatch': true };
  }

  // Submit the form
  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.router.navigate([''])
      // Handle registration logic (e.g., API call)
    }
  }

  // Redirect to login page
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
