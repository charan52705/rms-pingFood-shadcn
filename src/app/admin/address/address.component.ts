import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr'; 
import { Address, AddressService } from '../../services/address.service';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']  
})
export class AddressComponent {
  addressForm: FormGroup;
  isSubmitting: boolean = false;
  activeTab: string = 'create'; // Default tab
  isMenuOpen: boolean = false;
  addresses: Address[] = [];

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAddresses();
  }

  // Load all addresses
  loadAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (addresses) => {
        this.addresses = addresses;
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }

  // Handle form submission for adding or updating an address
  onSubmit(): void {
    if (this.addressForm.valid) {
      this.isSubmitting = true;
      const formData: Address = this.addressForm.value;

      if (this.activeTab === 'create') {
        this.addAddress(formData);
      } else if (this.activeTab === 'update') {
        this.updateAddress(formData);
      }
    }
  }

  // Add a new address
  addAddress(address: Address): void {
    this.addressService.addAddress(address).subscribe(
      (newAddress) => {
        this.addresses.push(newAddress); // Add the new address to the list
        this.addressForm.reset(); // Reset form
        this.setActiveTab('read'); // Switch to the 'read' tab
      },
      (error) => {
        console.error('Error adding address:', error);
      }
    );
  }

  // Update an existing address
  updateAddress(address: Address): void {
    this.addressService.updateAddress(address).subscribe(
      (updatedAddress) => {
        const index = this.addresses.findIndex(
          (existingAddress) => existingAddress.street === updatedAddress.street
        );
        if (index !== -1) {
          this.addresses[index] = updatedAddress; // Update the address in the list
        }
        this.addressForm.reset(); // Reset form
        this.setActiveTab('read'); // Switch to the 'read' tab
      },
      (error) => {
        console.error('Error updating address:', error);
      }
    );
  }

  // Delete an address
  deleteAddress(street: string): void {
    this.addressService.deleteAddress(street).subscribe(
      () => {
        this.addresses = this.addresses.filter(
          (address) => address.street !== street
        ); // Remove the deleted address
      },
      (error) => {
        console.error('Error deleting address:', error);
      }
    );
  }

  // Toggle the menu for mobile view
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Set the active tab for navigation
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.isMenuOpen = false; // Close mobile menu after tab selection
  }

  // Determine the active tab's CSS class
  tabClass(tab: string): string {
    return this.activeTab === tab
      ? 'text-black border-b-2 border-black'
      : 'text-gray-700';
  }

  // Select an address to update in the form
  selectAddressForUpdate(address: Address): void {
    this.addressForm.patchValue(address); // Populate form with the selected address
    this.setActiveTab('update'); // Switch to 'update' tab
  }
}
