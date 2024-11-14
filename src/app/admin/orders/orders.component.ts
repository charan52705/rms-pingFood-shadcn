import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Order, OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone:true, 
  imports:[FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderForm!: FormGroup;
  orders: Order[] = [];
  activeTab: string = 'create';
  isSubmitting: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadOrders();
  }

  // Initialize the form with validation
  initForm() {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      orderDate: ['', [Validators.required]],
      orderTotal: ['', [Validators.required, Validators.min(0)]],
      orderStatus: ['', [Validators.required]],
      items: ['', [Validators.required]] // Simplified for the demo
    });
  }

  // Submit the form and create a new order
  onSubmit() {
    if (this.orderForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const newOrder: Order = {
      ...this.orderForm.value,
      id: Math.floor(Math.random() * 10000), // Just a mock ID for the new order
    };

    this.ordersService.createOrder(newOrder).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loadOrders();  // Reload the orders list
        this.orderForm.reset();
      },
      error: () => {
        this.isSubmitting = false;
        alert('There was an error creating the order.');
      }
    });
  }

  // Load all orders from the service
  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: () => {
        alert('There was an error loading orders.');
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
