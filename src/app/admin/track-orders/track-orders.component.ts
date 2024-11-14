import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderStatus, TrackPaymentsService } from '../../services/track-orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-orders',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './track-orders.component.html',
  styleUrl: './track-orders.component.css'
})
export class TrackOrdersComponent {
  trackOrderForm!: FormGroup;
  paymentForm!: FormGroup;
  orderStatus: OrderStatus | null = null;
  paymentStatus: any = null;
  isSubmitting: boolean = false;
  activeTab: string = 'trackOrder';
  isMenuOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private trackPaymentsService: TrackPaymentsService
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  // Initialize the forms
  initForms() {
    this.trackOrderForm = this.fb.group({
      orderId: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentAmount: ['', [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required]
    });
  }

  // Track order by ID
  trackOrder() {
    if (this.trackOrderForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const orderId = this.trackOrderForm.value.orderId;
    this.trackPaymentsService.trackOrder(orderId).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        this.orderStatus = data;
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error tracking order');
      }
    });
  }

  // Process payment
  processPayment() {
    if (this.paymentForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const paymentDetails = this.paymentForm.value;
    this.trackPaymentsService.processPayment(paymentDetails).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        this.paymentStatus = data;
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error processing payment');
      }
    });
  }

  // Toggle mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Set active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Helper function to determine active tab's styling
  tabClass(tab: string): string {
    return this.activeTab === tab ? 'border-b-2 border-black' : '';
  }

}
