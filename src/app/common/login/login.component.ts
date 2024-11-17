import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userType: string = 'customer'; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['customer', Validators.required], 
    });
  }

  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, userType } = this.loginForm.value;

      
      this.authService.getUserData(email).then(
        (userData) => {
          this.authService.setUserType(userType);

          const confirmation = this.authService.isMatchingRoleandType();

          if (confirmation) {
           
            if (userType === 'Customer') {
              console.log('Navigating to customer home');
              this.authService.login(userData)
              this.router.navigate(['/customer/home']); 
            } else if (userType === 'Admin') {
              console.log('Navigating to admin home');
              this.router.navigate(['/admin/home']); 
            }
          } else {
            this.handleError('Role and user type do not match. Please check your credentials.');
          }
        },
        (error) => {
          this.handleError('An error occurred while authenticating. Please try again later.');
        }
      );
    } else {
      this.handleError('Please fill in all required fields correctly.');
    }
  }

  redirectToRegister() {
    this.router.navigate(['/common/register']);
  }

  
  private handleError(message: string) {
    alert(message); 
    console.error(message); 
  }
}
