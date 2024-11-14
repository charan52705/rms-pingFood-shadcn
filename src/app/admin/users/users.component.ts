import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  UserForm!: FormGroup;
  isSubmitting: boolean = false;
  Users: any[] = [];  
  activeTab: string = 'create';  
  isMenuOpen: boolean = false;   

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;  
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  tabClass(tab: string): string {
    return this.activeTab === tab
      ? 'border-b-2 border-black text-black'
      : 'text-gray-600 hover:text-black';
  }
  initForm(): void {
    this.UserForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(2)]],
      UserState: ['', [Validators.required, Validators.minLength(2)]],
      UserCountry: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    if (this.UserForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    
    setTimeout(() => {
      const newUser = this.UserForm.value;
      this.Users.push(newUser);
      this.UserForm.reset();
      this.isSubmitting = false;
      this.setActiveTab('read');
    }, 1000);
  }

}
