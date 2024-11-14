import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  userType: string = 'customer';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login as', this.userType, 'with', this.loginForm.value);
    }
    this.router.navigate([''])
  }
  redirectToRegister(): void {
    // Redirect to the appropriate registration page based on the selected user type
    if (this.userType === 'customer') {
      this.router.navigate(['/customer/register']);
    } else {
      this.router.navigate(['/admin/register']);
    }
  }
  

}
