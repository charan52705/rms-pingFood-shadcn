import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer, CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {


  customerForm!: FormGroup;
  customers: Customer[] = [];
  activeTab: string = 'create';
  isSubmitting: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCustomers();
  }

  
  initForm() {
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
      customerAddress: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  
  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const newCustomer: Customer = {
      ...this.customerForm.value,
      id: Math.floor(Math.random() * 10000)  
    };

    this.customerService.createCustomer(newCustomer).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loadCustomers();  
        this.customerForm.reset();
      },
      error: () => {
        this.isSubmitting = false;
        alert('There was an error creating the customer.');
      }
    });
  }

  
  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: () => {
        alert('There was an error loading customers.');
      }
    });
  }

  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'border-b-2 border-black' : '';
  }

}
