import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userType: string = 'Customer'; 
  isLoading: boolean = false;  

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

      this.isLoading = true;  

      
      this.authService.getUserData(email).then(
        (userData) => {
          this.authService.setUserType(userType);

          
          if (userData && userData.role) {
            
            this.redirectBasedOnRole(userData.role);
          } else {
            
            this.handleError('Invalid user data or role not found.');
          }

          this.isLoading = false; 
        },
        (error) => {
          this.handleError('An error occurred while authenticating. Please try again later.');
          this.isLoading = false; 
        }
      );
    } else {
      this.handleError('Please fill in all required fields correctly.');
    }
  }

  redirectToRegister() {
    this.router.navigate(['/common/register']);
  }

  private redirectBasedOnRole(role: string) {
    if (role === 'customer') {
      console.log('Navigating to customer home');
      this.authService.login(role);  
      this.router.navigate(['/customer/home']);
    } else if (role === 'Admin') {
      console.log('Navigating to admin home');
      this.authService.login(role);  
      this.router.navigate(['/admin/home']);
    } else {
      this.handleError('Unauthorized role.');
    }
  }

  
  private handleError(message: string) {
    
    alert(message);
    console.error(message);
  }
}
