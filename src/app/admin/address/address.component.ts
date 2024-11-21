import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService, Address } from '../../services/address.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone:true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  isMenuOpen = false;
  activeTab: string = 'create'; 
  addressForm!: FormGroup;
  addresses: Address[] = [];
  isSubmitting: boolean = false;
  selectedAddress: Address | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      doorno: ['', Validators.required],
      street_no: ['', Validators.required],
      landmark: [''],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });

    this.getAddresses();
  }

  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  
  getAddresses(): void {
    this.addressService.getAllAddresses().subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error fetching addresses', error);
      }
    );
  }

  
  onSubmit(): void {
    if (this.addressForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.addressService.createAddress(this.addressForm.value).subscribe(
      (data) => {
        console.log('Address created successfully:', data);
        this.isSubmitting = false;
        this.getAddresses(); 
        this.addressForm.reset();
      },
      (error) => {
        console.error('Failed to create address', error);
        this.isSubmitting = false;
      }
    );
  }

  
  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.addressForm.setValue({
      id: address.id,
      name: address.name,
      doorno: address.doorno,
      street_no: address.street_no,
      landmark: address.landmark,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    });
  }

  
  updateAddress(): void {
    if (this.addressForm.invalid || !this.selectedAddress) {
      return;
    }

    this.isSubmitting = true;

    this.addressService.updateAddress(this.selectedAddress.id, this.addressForm.value).subscribe(
      (data) => {
        console.log('Address updated successfully:', data);
        this.isSubmitting = false;
        this.getAddresses(); 
        this.addressForm.reset();
        this.selectedAddress = null;
      },
      (error) => {
        console.error('Failed to update address', error);
        this.isSubmitting = false;
      }
    );
  }

  
  deleteAddress(addressId: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(addressId).subscribe(
        (data) => {
          console.log('Address deleted successfully', data);
          this.getAddresses(); 
        },
        (error) => {
          console.error('Failed to delete address', error);
        }
      );
    }
  }

  
  tabClass(tab: string): string {
    return this.activeTab === tab
      ? 'py-2 px-6 text-lg font-medium text-gray-700 border-b-2 border-black'
      : 'py-2 px-6 text-lg font-medium text-gray-700';
  }
}
