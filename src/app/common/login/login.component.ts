import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userType: string = 'customer'; // Default value

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['customer', Validators.required] 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, userType } = this.loginForm.value; // Get the value of userType from the form control
      console.log('Form submitted', this.loginForm.value);
      this.authService.login(userType);

      // Redirect based on the selected userType
      if (userType === 'customer') {
        this.router.navigate(['/customer/home'])
      } else {
        this.router.navigate(['/admin/home']);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  redirectToRegister() {
    // Logic for redirection to the register page
    console.log('Redirecting to register...');
  }
}
