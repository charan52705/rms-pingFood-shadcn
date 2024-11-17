import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService, Order } from '../../services/orders.service';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderForm!: FormGroup;
  orders: Order[] = [];
  activeTab: string = 'create';
  isSubmitting: boolean = false;
  isMenuOpen: boolean = false;
  selectedOrder: Order | null = null;
  searchQuery: string = '';
  todayDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.createOrderForm();
    this.getOrders();
  }

  generateRandomOrderId(): number {
    const MAX = 1e9 + 7;
    return Math.floor(Math.random() * MAX) + 1;
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      order_id: [this.generateRandomOrderId(), [Validators.required]],
      customer: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      }),
      order_date: [this.todayDate, [Validators.required]],
      total_price: ['', [Validators.required, Validators.min(0)]],
      order_status: ['', [Validators.required]],
      order_type: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
      store: this.fb.group({
        store_id: [uuidv4(), [Validators.required]],
        store_name: ['', [Validators.required]],
        store_address: ['', [Validators.required]],
        store_phone: ['', [Validators.required]],
      }),
      items: ['', [Validators.required]],
    });
  }

  get filteredOrders() {
    return this.orders?.filter((order) =>
      order.customer.name
        ?.toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  async getOrders() {
    try {
      const response = await this.orderService.getAllOrders();
      this.orders = response;
      console.log(this.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'create') {
      this.orderForm.reset();
      this.selectedOrder = null;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async onSubmit() {
    if (this.orderForm.invalid) {
      console.log('Form is invalid!');
      console.log(this.orderForm.errors);
      Object.keys(this.orderForm.controls).forEach((key) => {
        console.log(key, this.orderForm.controls[key].errors);
      });
      return;
    }

    this.isSubmitting = true;

    let formData = { ...this.orderForm.value };
    console.log(formData);

    if (!formData.store.store_id) formData.store.store_id = uuidv4();

    if (formData.items && !Array.isArray(formData.items)) {
      formData.items = JSON.parse(formData.items);
    }

    try {
      const response = await this.orderService.createOrder(formData);
      console.log(response);
      this.isSubmitting = false;
      this.getOrders();
      this.setActiveTab('read');
      alert('Order created successfully!');
    } catch (error) {
      this.isSubmitting = false;
      console.error('Error creating order:', error);
    }
  }

  selectOrderForUpdate(order: Order) {
    this.selectedOrder = order;
    this.orderForm.patchValue({
      order_id: order.order_id,
      customer: {
        name: order.customer.name,
        phone: order.customer.phone,
        email: order.customer.email,
      },
      order_date: order.order_date,
      total_price: order.total_price,
      order_status: order.order_status,
      order_type: order.order_type,
      payment_method: order.payment_method,
      store: {
        store_id: order.store.store_id,
        store_name: order.store.store_name,
        store_address: order.store.store_address,
        store_phone: order.store.store_phone,
      },
      items: JSON.stringify(order.items),
    });
    this.setActiveTab('update');
  }

  async updateOrder() {
    if (this.orderForm.invalid) {
      console.log('Form is invalid!');
      Object.keys(this.orderForm.controls).forEach((key) => {
        console.log(key, this.orderForm.controls[key].errors);
      });
      return;
    }

    this.isSubmitting = true;

    const formData = { ...this.orderForm.value };

    if (!formData.store.store_id) formData.store.store_id = uuidv4();

    if (formData.items && !Array.isArray(formData.items)) {
      formData.items = JSON.parse(formData.items);
    }

    try {
      const response = await this.orderService.updateOrder(
        formData.order_id.toString(),
        formData
      );
      console.log('Order updated successfully:', response);
      this.isSubmitting = false;
      this.getOrders();
      this.setActiveTab('read');
      alert('Order updated successfully!');
      this.orderForm.reset();
    } catch (error) {
      console.error('Error updating order:', error);
      this.isSubmitting = false;
    }
  }

  async deleteOrder(order: Order) {
    if (
      confirm(
        `Are you sure you want to delete the order for ${order.customer.name}?`
      )
    ) {
      try {
        await this.orderService.deleteOrder(order.order_id.toString());
        this.getOrders();
        this.selectedOrder = null;
        alert('Order deleted successfully!');
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  }

  tabClass(tab: string) {
    return this.activeTab === tab ? 'text-black border-b-2 border-black' : '';
  }
}
