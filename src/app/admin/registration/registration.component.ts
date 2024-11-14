import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  retypePassword: string = '';
  agreeTerms: boolean = false;
  message: string = '';

  constructor(private registrationService: RegisterService) {}

  onSubmit() {
    if (this.password !== this.retypePassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    const userData = {
      full_name: this.fullName,
      email: this.email,
      password: this.password,
      retype_password: this.retypePassword,
      agree_terms: this.agreeTerms
    };

    this.registrationService.register(userData)
      .then(response => {
        this.message = response.message;
      })
      .catch(error => {
        this.message = error.error || error;
      });
  }
}
