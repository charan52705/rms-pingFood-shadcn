import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr'; 
import { AddressService } from '../../services/address.service';


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
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private addressService: AddressService  
  ) {
    
    this.addressForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
    });
  }

  onSubmit() {
    if (this.addressForm.invalid) {
      console.log('Form is invalid');  
      return;
    }

    this.isSubmitting = true;

    
    this.addressService.addAddress(this.addressForm.value)
      .then(response => {
        this.isSubmitting = false;
        console.log('Address Added', 'Your address has been successfully saved.');
        console.log(response);  
      })
      .catch(error => {
        this.isSubmitting = false;
        console.error('Error:', error);  
      });
  }
}
